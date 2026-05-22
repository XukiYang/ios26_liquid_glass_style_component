<template>
  <Teleport to="body">
    <div v-if="modelValue" class="sheet-backdrop" @click="close">
      <div
        class="sheet material-thick"
        :class="[detentClass]"
        :style="{ transform: `translateY(${offsetY}px)` }"
        @click.stop
        @pointerdown="onDragStart"
        @pointermove="onDragMove"
        @pointerup="onDragEnd"
      >
        <div v-if="grabber" class="sheet-grabber"></div>
        <div v-if="title" class="sheet-header">
          <h2 class="text-headline">{{ title }}</h2>
        </div>
        <div class="sheet-content">
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

const detentClass = computed(() => `detent-${props.detent}`)

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
.detent-medium .sheet-content { min-height: 40vh; }
.detent-large .sheet-content { min-height: 70vh; }
.detent-full .sheet-content { min-height: 90vh; }
</style>
