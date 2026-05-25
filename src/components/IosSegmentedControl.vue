<template>
  <div class="ios-segmented-control" role="tablist">
    <div class="ios-segment-indicator" :style="indicatorStyle" />
    <button
      v-for="(label, i) in segments"
      :key="label"
      role="tab"
      class="ios-segment"
      :class="{ 'ios-segment-active': modelValue === i }"
      :aria-selected="modelValue === i"
      @click="onSelect(i)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  segments: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'change'])

const indicatorStyle = computed(() => {
  const n = props.segments.length
  return {
    width: `calc((100% - 4px) / ${n})`,
    transform: `translateX(calc(${props.modelValue} * 100%))`,
  }
})

function onSelect(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style scoped>
.ios-segmented-control {
  position: relative;
  display: flex;
  height: 32px;
  background: var(--fill-tertiary);
  border-radius: var(--radius-9);
  padding: 2px;
}

.ios-segment-indicator {
  position: absolute;
  top: 2px;
  left: 2px;
  height: calc(100% - 4px);
  background: var(--bg-primary);
  border-radius: var(--radius-7);
  box-shadow:
    0 3px 8px rgba(0, 0, 0, 0.12),
    0 3px 1px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1.0);
  z-index: 0;
}

.ios-segment {
  flex: 1;
  position: relative;
  z-index: 1;
  min-width: 44px;
  padding: 0 8px;
  border: none;
  border-radius: var(--radius-7);
  background: transparent;
  color: var(--label-secondary);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--text-footnote);
  font-weight: var(--weight-regular);
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  white-space: nowrap;
}

.ios-segment.ios-segment-active {
  color: var(--label-primary);
  font-weight: var(--weight-semibold);
}

[data-theme="dark"] .ios-segment-indicator {
  background: rgba(255, 255, 255, 0.27);
  box-shadow: none;
}
</style>
