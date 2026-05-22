<template>
  <div class="ios-segmented-control" role="tablist">
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
const props = defineProps({
  segments: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'change'])

function onSelect(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style scoped>
.ios-segmented-control {
  display: flex;
  background-color: var(--fill-secondary);
  border-radius: var(--radius-md);
  padding: 2px;
  gap: 2px;
}
.ios-segment {
  flex: 1;
  padding: var(--space-1) var(--space-3);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--label-secondary);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
  font-weight: var(--weight-medium);
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.ios-segment.ios-segment-active {
  background-color: var(--bg-primary);
  color: var(--label-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
