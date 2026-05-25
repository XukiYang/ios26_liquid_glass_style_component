<template>
  <Teleport to="body">
    <div v-if="modelValue" class="ios-sheet-backdrop" @click="close">
      <div
        class="ios-sheet"
        :class="[detentClass]"
        :style="{ transform: `translateY(${offsetY}px)` }"
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
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  grabber: { type: Boolean, default: true },
  detent: { type: String, default: 'large' },
  title: String,
})

const emit = defineEmits(['update:modelValue', 'close'])

const startY = ref(0)
const offsetY = ref(0)
const dragging = ref(false)

const detentClass = computed(() => `ios-detent-${props.detent}`)

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onDragStart(e) {
  dragging.value = true
  startY.value = e.clientY
  offsetY.value = 0
}

function onDragMove(e) {
  if (!dragging.value) return
  offsetY.value = Math.max(0, e.clientY - startY.value)
}

function onDragEnd() {
  dragging.value = false
  if (offsetY.value > 150) close()
  offsetY.value = 0
}
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
  background: rgba(255, 255, 255, 0.84);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
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
  font-family: var(--font-family);
  font-size: var(--text-headline);
  line-height: var(--lh-headline);
  letter-spacing: var(--ls-headline);
  font-weight: var(--weight-semibold);
  margin: 0;
}
[data-theme="dark"] .ios-sheet {
  background: rgba(0, 0, 0, 0.84);
}

.ios-detent-medium .ios-sheet-content { min-height: 40vh; }
.ios-detent-large .ios-sheet-content { min-height: 70vh; }
.ios-detent-full .ios-sheet-content { min-height: 90vh; }
</style>
