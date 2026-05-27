import { ref } from 'vue'

/**
 * useDrag — Pointer drag gesture composable.
 *
 * Tracks pointer drag distance and direction.
 * Returns event handlers to bind to a draggable element.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=5] - Minimum px moved to count as drag (below = click)
 * @param {Function} [options.onDragStart] - Called when drag begins
 * @param {Function} [options.onDragMove] - Called on each pointer move with { dx, dy }
 * @param {Function} [options.onDragEnd] - Called when drag ends with { dx, dy, distance, isClick }
 *
 * @returns {{
 *   isDragging: import('vue').Ref<boolean>,
 *   onPointerDown: (e: PointerEvent) => void,
 *   onPointerMove: (e: PointerEvent) => void,
 *   onPointerUp: (e: PointerEvent) => void,
 * }}
 */
export function useDrag(options = {}) {
  const { threshold = 5, onDragStart, onDragMove, onDragEnd } = options

  const isDragging = ref(false)
  const startX = ref(0)
  const startY = ref(0)

  function onPointerDown(e) {
    isDragging.value = true
    startX.value = e.clientX
    startY.value = e.clientY
    e.target.setPointerCapture?.(e.pointerId)
    onDragStart?.({ x: e.clientX, y: e.clientY })
  }

  function onPointerMove(e) {
    if (!isDragging.value) return
    const dx = e.clientX - startX.value
    const dy = e.clientY - startY.value
    onDragMove?.({ dx, dy })
  }

  function onPointerUp(e) {
    if (!isDragging.value) return
    isDragging.value = false
    const dx = e.clientX - startX.value
    const dy = e.clientY - startY.value
    const distance = Math.sqrt(dx * dx + dy * dy)
    onDragEnd?.({ dx, dy, distance, isClick: distance < threshold })
  }

  return { isDragging, onPointerDown, onPointerMove, onPointerUp }
}
