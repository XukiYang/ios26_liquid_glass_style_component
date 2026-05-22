/* ==========================================================================
   usePillLiquidGlass — per-pill canvas SDF + SVG feDisplacementMap

   Generates a pill-shaped displacement map for a convex-lens refraction
   effect (liquid-glass.js style). Each pill gets its own hidden canvas
   and SVG filter, sized exactly to the pill's rendered dimensions so the
   displacement centre aligns perfectly with the pill centre.
   ========================================================================== */

const DPI = 2

/* ---- SDF Helpers -------------------------------------------------------- */
function roundedRectSDF(x, y, hw, hh, r) {
  const qx = Math.abs(x) - hw + r
  const qy = Math.abs(y) - hh + r
  return Math.min(Math.max(qx, qy), 0)
    + Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2)
    - r
}

function smoothStep(a, b, t) {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/* ---- Public Hook -------------------------------------------------------- */
export function usePillLiquidGlass() {
  const id = 'lg-pill-' + Math.random().toString(36).slice(2, 9)

  /* ---- SVG filter (userSpaceOnUse, sized to pill px dimensions) ---------- */
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;'

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
  const filterEl = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
  filterEl.setAttribute('id', id)
  filterEl.setAttribute('filterUnits', 'userSpaceOnUse')
  filterEl.setAttribute('colorInterpolationFilters', 'sRGB')

  const feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage')
  feImage.setAttribute('result', 'map')

  const feDisp = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap')
  feDisp.setAttribute('in', 'SourceGraphic')
  feDisp.setAttribute('in2', 'map')
  feDisp.setAttribute('xChannelSelector', 'R')
  feDisp.setAttribute('yChannelSelector', 'G')

  filterEl.appendChild(feImage)
  filterEl.appendChild(feDisp)
  defs.appendChild(filterEl)
  svg.appendChild(defs)
  document.body.appendChild(svg)

  const canvas = document.createElement('canvas')
  canvas.style.display = 'none'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  /* ---- State ------------------------------------------------------------ */
  let _w = 0
  let _h = 0
  let _scale = 6

  /* ---- Render displacement map at exact pill pixel dimensions ------------ */
  function render() {
    const cw = Math.round(_w * DPI)
    const ch = Math.round(_h * DPI)
    if (cw < 2 || ch < 2) return
    canvas.width = cw
    canvas.height = ch

    const imageData = ctx.createImageData(cw, ch)
    const d = imageData.data

    // Pill geometry in UV space (centre = 0.5, 0.5)
    const halfW = 0.47
    const halfH = 0.43
    const radius = 0.43
    let maxDisp = 0
    const rawValues = []

    for (let i = 0; i < d.length; i += 4) {
      const px = (i / 4) % cw
      const py = Math.floor(i / 4 / cw)
      const ux = px / cw
      const uy = py / ch
      const ix = ux - 0.5
      const iy = uy - 0.5

      const sdf = roundedRectSDF(ix, iy, halfW, halfH, radius)
      const edgeFade = smoothStep(0.07, -0.015, sdf)
      const strength = smoothStep(0, 1, edgeFade)

      // Convex lens: pull UV toward centre, in pixel space
      const dx = -ix * strength * cw * 0.04
      const dy = -iy * strength * ch * 0.04
      maxDisp = Math.max(maxDisp, Math.abs(dx), Math.abs(dy))
      rawValues.push(dx, dy)
    }

    maxDisp = Math.max(maxDisp * 0.5, 1)

    let idx = 0
    for (let i = 0; i < d.length; i += 4) {
      d[i]     = Math.round((rawValues[idx]     / maxDisp + 0.5) * 255)
      d[i + 1] = Math.round((rawValues[idx + 1] / maxDisp + 0.5) * 255)
      d[i + 2] = 0
      d[i + 3] = 255
      idx += 2
    }

    ctx.putImageData(imageData, 0, 0)

    // Match filter region exactly to pill dimensions
    filterEl.setAttribute('x', '0')
    filterEl.setAttribute('y', '0')
    filterEl.setAttribute('width', String(_w))
    filterEl.setAttribute('height', String(_h))
    feImage.setAttribute('width', String(_w))
    feImage.setAttribute('height', String(_h))
    feImage.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href',
      canvas.toDataURL('image/png'),
    )
    feDisp.setAttribute('scale', String(maxDisp / DPI))
  }

  /* ---- Public API ------------------------------------------------------- */
  function setSize(w, h) {
    if (w !== _w || h !== _h) {
      _w = w
      _h = h
      render()
    }
  }

  function destroy() {
    svg.remove()
    canvas.remove()
  }

  return { id, setSize, destroy }
}
