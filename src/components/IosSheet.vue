<template>
  <Teleport to="body">
    <Transition name="ios-sheet">
      <div v-if="modelValue" class="ios-sheet-backdrop" @click="close">
        <div
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
    </Transition>
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
import { ref, computed } from 'vue'
import { useDrag } from '../composables/useDrag.js'

const props = defineProps({
  modelValue: Boolean,
  grabber: { type: Boolean, default: true },
  detent: { type: String, default: 'large' },
  title: String,
})

const emit = defineEmits(['update:modelValue', 'close'])

const offsetY = ref(0)
const detentClass = computed(() => `ios-detent-${props.detent}`)

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

/* ---- Enter/leave animations ---- */
.ios-sheet-enter-active,
.ios-sheet-leave-active {
  transition: opacity var(--duration-slow) var(--ease-default);
}
.ios-sheet-enter-from,
.ios-sheet-leave-to {
  opacity: 0;
}
.ios-sheet-enter-active .ios-sheet,
.ios-sheet-leave-active .ios-sheet {
  transition: transform 0.4s var(--ease-default);
}
.ios-sheet-enter-from .ios-sheet {
  transform: translateY(100%);
}
.ios-sheet-leave-to .ios-sheet {
  transform: translateY(100%);
}
</style>
