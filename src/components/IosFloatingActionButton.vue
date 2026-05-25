<template>
  <div
    class="ios-fab"
    :class="[
      `ios-fab-${position}`,
      {
        'ios-fab-expanded': expanded,
        'ios-fab-dragging': dragging,
      },
    ]"
    :style="fabStyle"
  >
    <div
      class="ios-fab-actions-panel"
      :class="{ 'ios-fab-actions-panel-visible': expanded }"
    >
      <slot name="actions" />
    </div>

    <button
      class="ios-fab-btn"
      :class="{ 'ios-fab-btn-active': expanded }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
    >
      <slot>
        <IosIcon name="application-menu" size="22" />
      </slot>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import IosIcon from './IosIcon.vue'

/**
 * IosFloatingActionButton — Draggable FAB with expandable actions panel.
 *
 * @prop {boolean} [expanded=false]        - v-model:expanded, whether the actions panel is visible.
 * @prop {'bottom-right'|'bottom-left'|'top-right'|'top-left'} [position='bottom-right'] - Corner placement.
 * @prop {boolean} [draggable=true]        - Allow pointer-drag repositioning.
 * @prop {number}  [offsetX=20]            - Default horizontal inset from the chosen edge (px).
 * @prop {number}  [offsetY=20]            - Default vertical   inset from the chosen edge (px).
 * @prop {number}  [zIndex=100]            - Stacking order (CSS z-index).
 *
 * @event {'update:expanded'} expandedChanged - Emitted when the user clicks the main button.
 * @event {'drag-end'}        dragEnd          - Emitted after a drag gesture ends. Payload: `{ x, y }`
 */
const props = defineProps({
  /** v-model:expanded — whether the actions panel is visible */
  expanded: { type: Boolean, default: false },
  /** Corner placement: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' */
  position: { type: String, default: 'bottom-right' },
  /** Allow pointer-drag repositioning */
  draggable: { type: Boolean, default: true },
  /** Default horizontal inset from the chosen edge (px) */
  offsetX: { type: Number, default: 20 },
  /** Default vertical   inset from the chosen edge (px) */
  offsetY: { type: Number, default: 20 },
  /** Stacking order (CSS z-index) */
  zIndex: { type: Number, default: 100 },
})

const emit = defineEmits(['update:expanded', 'drag-end'])

const FAB_SIZE = 44

const posX = ref(0)
const posY = ref(0)
const dragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const dragOriginX = ref(0)
const dragOriginY = ref(0)

/** @type {import('vue').ComputedRef<{ left: string, top: string, zIndex: number }>} */
const fabStyle = computed(() => ({
  left: `${posX.value}px`,
  top: `${posY.value}px`,
  zIndex: props.zIndex,
}))

/**
 * Calculate initial left/top from the current `position`, `offsetX`, and `offsetY` props.
 */
function computePosition() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  switch (props.position) {
    case 'bottom-right':
      posX.value = vw - props.offsetX - FAB_SIZE
      posY.value = vh - props.offsetY - FAB_SIZE
      break
    case 'bottom-left':
      posX.value = props.offsetX
      posY.value = vh - props.offsetY - FAB_SIZE
      break
    case 'top-right':
      posX.value = vw - props.offsetX - FAB_SIZE
      posY.value = props.offsetY
      break
    case 'top-left':
      posX.value = props.offsetX
      posY.value = props.offsetY
      break
  }
}

/** Keep the FAB fully inside the viewport. */
function clampToViewport() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  posX.value = Math.max(0, Math.min(vw - FAB_SIZE, posX.value))
  posY.value = Math.max(0, Math.min(vh - FAB_SIZE, posY.value))
}

/** @param {PointerEvent} e */
function onPointerDown(e) {
  if (!props.draggable) {
    emit('update:expanded', !props.expanded)
    return
  }

  dragging.value = true
  dragStartX.value = e.clientX
  dragStartY.value = e.clientY
  dragOriginX.value = posX.value
  dragOriginY.value = posY.value

  // Ensure we receive move/up events even when the pointer leaves the element
  e.target.setPointerCapture(e.pointerId)
}

/** @param {PointerEvent} e */
function onPointerMove(e) {
  if (!dragging.value) return
  const dx = e.clientX - dragStartX.value
  const dy = e.clientY - dragStartY.value
  posX.value = dragOriginX.value + dx
  posY.value = dragOriginY.value + dy
  clampToViewport()
}

/** @param {PointerEvent} e */
function onPointerUp(e) {
  if (!dragging.value) return
  dragging.value = false

  const dx = e.clientX - dragStartX.value
  const dy = e.clientY - dragStartY.value
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance < 5) {
    // Threshold: treat as a click/tap
    emit('update:expanded', !props.expanded)
  } else {
    emit('drag-end', { x: Math.round(posX.value), y: Math.round(posY.value) })
  }
}

function onResize() {
  clampToViewport()
}

onMounted(() => {
  computePosition()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

watch(
  () => [props.position, props.offsetX, props.offsetY],
  () => { computePosition() },
)
</script>

<style scoped>
/* ==========================================================================
   IosFloatingActionButton — iOS 26 Liquid Glass FAB
   ========================================================================== */

/* ---- Container (fixed-position anchor) ---- */
.ios-fab {
  position: fixed;
  width: 44px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* ---- Drag state — keep visual unchanged ---- */
.ios-fab.ios-fab-dragging {
  transition: none;
}

/* ---- Actions panel ---- */
.ios-fab-actions-panel {
  position: absolute;
  bottom: calc(100% + var(--space-2));
  min-width: 160px;
  max-height: 240px;
  overflow-y: auto;
  background: var(--fill-secondary);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: var(--radius-xl);
  border: var(--border-hairline) solid var(--separator);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: var(--space-1);
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  transition: opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
              transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
  pointer-events: none;
}

.ios-fab-actions-panel-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* Panel horizontal alignment — right positions */
.ios-fab-bottom-right .ios-fab-actions-panel,
.ios-fab-top-right .ios-fab-actions-panel {
  right: 0;
  left: auto;
}

/* Panel horizontal alignment — left positions */
.ios-fab-bottom-left .ios-fab-actions-panel,
.ios-fab-top-left .ios-fab-actions-panel {
  left: 0;
  right: auto;
}

/* ---- Main FAB button ---- */
.ios-fab-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: var(--border-hairline) solid var(--separator);
  background: var(--fill-secondary);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--label-primary);
  font-family: var(--font-family);
  transition: transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
              background 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
  touch-action: none;
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

/* Active press */
.ios-fab-btn:active {
  transform: scale(0.92);
}

/* Expanded state: rotate menu icon */
.ios-fab-btn-active {
  transform: rotate(90deg);
  background: var(--fill-primary);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
}

/* Suppress button transitions while the whole FAB is being dragged */
.ios-fab-dragging .ios-fab-btn {
  transition: none;
}

/* ---- Panel scrollbar ---- */
.ios-fab-actions-panel::-webkit-scrollbar {
  width: 3px;
}

.ios-fab-actions-panel::-webkit-scrollbar-thumb {
  background: var(--label-quaternary);
  border-radius: var(--radius-xs);
}
</style>
