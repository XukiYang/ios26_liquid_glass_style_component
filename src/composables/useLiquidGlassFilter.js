/* ==========================================================================
   Global SVG filter for liquid glass pill indicator
   Uses feTurbulence + feDisplacementMap for organic glass distortion.
   Injected once into document.body.
   ========================================================================== */

const FILTER_ID = 'liquid-glass-pill-filter'
let injected = false

export function useLiquidGlassFilter() {
  if (injected) return FILTER_ID

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:0;'

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
  filter.setAttribute('id', FILTER_ID)
  filter.setAttribute('filterUnits', 'userSpaceOnUse')
  filter.setAttribute('x', '-20%')
  filter.setAttribute('y', '-20%')
  filter.setAttribute('width', '140%')
  filter.setAttribute('height', '140%')
  filter.setAttribute('colorInterpolationFilters', 'sRGB')

  // Noise source for displacement
  const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence')
  turbulence.setAttribute('type', 'fractalNoise')
  turbulence.setAttribute('baseFrequency', '0.015 0.02')
  turbulence.setAttribute('numOctaves', '3')
  turbulence.setAttribute('seed', '3')
  turbulence.setAttribute('result', 'noise')

  // Soften the noise so displacement is subtle
  const colorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix')
  colorMatrix.setAttribute('in', 'noise')
  colorMatrix.setAttribute('type', 'matrix')
  colorMatrix.setAttribute('values', '0.6 0 0 0 0  0 0.6 0 0 0  0 0 0 0 0  0 0 0 0.5 0')
  colorMatrix.setAttribute('result', 'softNoise')

  const displacement = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap')
  displacement.setAttribute('in', 'SourceGraphic')
  displacement.setAttribute('in2', 'softNoise')
  displacement.setAttribute('scale', '8')
  displacement.setAttribute('xChannelSelector', 'R')
  displacement.setAttribute('yChannelSelector', 'G')

  filter.appendChild(turbulence)
  filter.appendChild(colorMatrix)
  filter.appendChild(displacement)
  defs.appendChild(filter)
  svg.appendChild(defs)
  document.body.appendChild(svg)

  injected = true
  return FILTER_ID
}
