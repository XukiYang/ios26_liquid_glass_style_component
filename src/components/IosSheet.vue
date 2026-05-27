<template>
  <Teleport to="body">
    <div v-if="visible" ref="backdropRef" class="ios-sheet-backdrop" @click="close">
      <div
        ref="sheetRef"
        class="ios-sheet"
        :class="[detentClass]"
        :style="{ marginTop: offsetY + 'px' }"
        @click.stop
      >
        <div v-if="grabber" class="ios-sheet-grabber"
          @pointerdown="onDragStart"
          @pointermove="onDragMove"
          @pointerup="onDragEnd"
        ></div>
        <div v-if="title" class="ios-sheet-header">
          <h2>{{ title }}</h2>
        </div>
        <div class="ios-sheet-content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * IosSheet — Bottom sheet with grabber, detents, and title.
 *
 * @prop {boolean} [modelValue=false] - Visibility state (v-model)
 * @prop {boolean} [grabber=true] - Show drag grabber
 * @prop {'medium'|'large'|'full'} [detent='large'] - Sheet height preset
 * @prop {string} [title] - Optional header title
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on close (v-model)
 * @event {'close'} close - Emitted when sheet closes
 */
import { ref, computed, watch } from 'vue'
import { useDrag } from '../composables/useDrag.js'
import { useGsap } from '../composables/useGsap.js'

const props = defineProps({
  modelValue: Boolean,
  grabber: { type: Boolean, default: true },
  detent: { type: String, default: 'large' },
  title: String,
})

const emit = defineEmits(['update:modelValue', 'close'])

const { tween, reducedMotion, SPRING, DURATION } = useGsap()

const visible = ref(false)
const backdropRef = ref(null)
const sheetRef = ref(null)
const offsetY = ref(0)
const detentClass = computed(() => `ios-detent-${props.detent}`)

watch(() => props.modelValue, (show) => {
  if (show) {
    visible.value = true
    requestAnimationFrame(() => {
      if (!backdropRef.value || !sheetRef.value) return
      tween(backdropRef.value, { opacity: 1, duration: DURATION.normal, ease: 'power2.out' })
      tween(sheetRef.value, {
        y: '0%',
        duration: reducedMotion ? 0 : 0.5,
        ease: SPRING.ease,
      })
    })
  } else if (visible.value) {
    const tl = tween(backdropRef.value, { opacity: 0, duration: DURATION.normal, ease: 'power2.in' })
    tween(sheetRef.value, {
      y: '100%',
      duration: DURATION.normal,
      ease: 'power2.in',
      onComplete: () => { visible.value = false },
    })
  }
})

function close() {
  emit('update:modelValue', false)
  emit('close')
}

const { isDragging: dragging, onPointerDown: onDragStart, onPointerMove: onDragMove, onPointerUp: onDragEnd } = useDrag({
  onDragMove({ dy }) {
    offsetY.value = Math.max(0, dy)
  },
  onDragEnd({ dy }) {
    if (dy > 150) close()
    offsetY.value = 0
  },
})
</script>

<style scoped>
.ios-sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
  opacity: 0;
}
.ios-sheet {
  width: 100%;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: var(--space-2) var(--space-4) var(--space-8);
  max-height: 85vh;
  overflow-y: auto;
  background: var(--sheet-bg);
  backdrop-filter: blur(var(--sheet-blur));
  -webkit-backdrop-filter: blur(var(--sheet-blur));
  transform: translateY(100%);
}
.ios-sheet-grabber {
  width: 36px;
  height: 5px;
  border-radius: 3px;
  background-color: var(--gray-3);
  margin: var(--space-2) auto var(--space-3);
}
.ios-sheet-header { margin-bottom: var(--space-4); }
.ios-sheet-header h2 {
  font: var(--type-headline);
  margin: 0;
}
[data-theme="dark"] .ios-sheet {
  background: var(--sheet-bg);
}

.ios-detent-medium .ios-sheet-content { min-height: 40vh; }
.ios-detent-large .ios-sheet-content { min-height: 70vh; }
.ios-detent-full .ios-sheet-content { min-height: 90vh; }
</style>
