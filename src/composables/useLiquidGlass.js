/* ==========================================================================
   Liquid Glass — SVG Filter Displacement Effect
   Ported from: https://github.com/shuding/liquid-glass
   ========================================================================== */

function smoothStep(a, b, t) {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function length(x, y) {
  return Math.sqrt(x * x + y * y)
}

function roundedRectSDF(x, y, width, height, radius) {
  const qx = Math.abs(x) - width + radius
  const qy = Math.abs(y) - height + radius
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius
}

function texture(x, y) {
  return { type: 't', x, y }
}

function generateId() {
  return 'liquid-glass-' + Math.random().toString(36).substr(2, 9)
}

export class LiquidGlassShader {
  constructor(options = {}) {
    this.width = options.width || 300
    this.height = options.height || 200
    this.fragment = options.fragment || ((uv) => texture(uv.x, uv.y))
    this.canvasDPI = 1
    this.id = generateId()
    this.mouse = { x: 0, y: 0 }
    this.mouseUsed = false
    this.running = false
    this.rafId = null
  }

  mount(containerEl) {
    if (this.container) return

    this.container = document.createElement('div')
    this.container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${this.width}px;
      height: ${this.height}px;
      overflow: hidden;
      border-radius: 150px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.25), 0 -10px 25px inset rgba(0,0,0,0.15);
      cursor: grab;
      backdrop-filter: url(#${this.id}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1);
      z-index: 9999;
      pointer-events: auto;
    `

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.svg.setAttribute('width', '0')
    this.svg.setAttribute('height', '0')
    this.svg.style.cssText = 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9998;'

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', `${this.id}_filter`)
    filter.setAttribute('filterUnits', 'userSpaceOnUse')
    filter.setAttribute('colorInterpolationFilters', 'sRGB')
    filter.setAttribute('x', '0')
    filter.setAttribute('y', '0')
    filter.setAttribute('width', this.width.toString())
    filter.setAttribute('height', this.height.toString())

    this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage')
    this.feImage.setAttribute('id', `${this.id}_map`)
    this.feImage.setAttribute('width', this.width.toString())
    this.feImage.setAttribute('height', this.height.toString())

    this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap')
    this.feDisplacementMap.setAttribute('in', 'SourceGraphic')
    this.feDisplacementMap.setAttribute('in2', `${this.id}_map`)
    this.feDisplacementMap.setAttribute('xChannelSelector', 'R')
    this.feDisplacementMap.setAttribute('yChannelSelector', 'G')

    filter.appendChild(this.feImage)
    filter.appendChild(this.feDisplacementMap)
    defs.appendChild(filter)
    this.svg.appendChild(defs)

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width * this.canvasDPI
    this.canvas.height = this.height * this.canvasDPI
    this.canvas.style.display = 'none'
    this.context = this.canvas.getContext('2d')

    containerEl.appendChild(this.svg)
    containerEl.appendChild(this.container)

    this.setupEvents()
    this.running = true
    this.tick()
  }

  constrainPosition(x, y) {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const offset = 10
    return {
      x: Math.max(offset, Math.min(vw - this.width - offset, x)),
      y: Math.max(offset, Math.min(vh - this.height - offset, y)),
    }
  }

  setupEvents() {
    let isDragging = false
    let startX, startY, initialX, initialY

    this.container.addEventListener('mousedown', (e) => {
      isDragging = true
      this.container.style.cursor = 'grabbing'
      startX = e.clientX
      startY = e.clientY
      const rect = this.container.getBoundingClientRect()
      initialX = rect.left
      initialY = rect.top
      e.preventDefault()
    })

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const constrained = this.constrainPosition(
          initialX + (e.clientX - startX),
          initialY + (e.clientY - startY)
        )
        this.container.style.left = constrained.x + 'px'
        this.container.style.top = constrained.y + 'px'
        this.container.style.transform = 'none'
      }
      const rect = this.container.getBoundingClientRect()
      this.mouse.x = (e.clientX - rect.left) / rect.width
      this.mouse.y = (e.clientY - rect.top) / rect.height
    })

    document.addEventListener('mouseup', () => {
      isDragging = false
      this.container.style.cursor = 'grab'
    })

    window.addEventListener('resize', () => {
      const rect = this.container.getBoundingClientRect()
      const constrained = this.constrainPosition(rect.left, rect.top)
      if (rect.left !== constrained.x || rect.top !== constrained.y) {
        this.container.style.left = constrained.x + 'px'
        this.container.style.top = constrained.y + 'px'
        this.container.style.transform = 'none'
      }
    })
  }

  tick() {
    if (!this.running) return
    this.updateShader()
    this.rafId = requestAnimationFrame(() => this.tick())
  }

  updateShader() {
    const mouseProxy = new Proxy(this.mouse, {
      get: (target, prop) => { this.mouseUsed = true; return target[prop] }
    })
    this.mouseUsed = false

    const w = this.width * this.canvasDPI
    const h = this.height * this.canvasDPI
    const data = new Uint8ClampedArray(w * h * 4)
    let maxScale = 0
    const rawValues = []

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w
      const y = Math.floor(i / 4 / w)
      const pos = this.fragment({ x: x / w, y: y / h }, mouseProxy)
      const dx = pos.x * w - x
      const dy = pos.y * h - y
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
      rawValues.push(dx, dy)
    }

    maxScale *= 0.5
    let index = 0
    for (let i = 0; i < data.length; i += 4) {
      data[i] = ((rawValues[index++] / maxScale) + 0.5) * 255
      data[i + 1] = ((rawValues[index++] / maxScale) + 0.5) * 255
      data[i + 2] = 0
      data[i + 3] = 255
    }

    this.context.putImageData(new ImageData(data, w, h), 0, 0)
    this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL())
    this.feDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI).toString())
  }

  destroy() {
    this.running = false
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.svg?.remove()
    this.container?.remove()
    this.canvas?.remove()
  }
}

export function createLiquidGlass(container, options = {}) {
  const shader = new LiquidGlassShader({
    width: options.width || 300,
    height: options.height || 200,
    fragment: options.fragment || ((uv, mouse) => {
      const ix = uv.x - 0.5
      const iy = uv.y - 0.5
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
      const scaled = smoothStep(0, 1, displacement)
      return texture(ix * scaled + 0.5, iy * scaled + 0.5)
    })
  })
  shader.mount(container)
  return shader
}
