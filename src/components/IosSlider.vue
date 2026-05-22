<template>
  <div class="ios-slider-wrapper">
    <div v-if="$slots.leading" class="ios-slider-leading"><slot name="leading" /></div>
    <input
      type="range"
      class="ios-slider"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :value="modelValue"
      :style="{ '--ios-slider-fill': fillPercent + '%' }"
      @input="onInput"
    />
    <div v-if="$slots.trailing" class="ios-slider-trailing"><slot name="trailing" /></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'change'])

const fillPercent = computed(() =>
  ((props.modelValue - props.min) / (props.max - props.min)) * 100
)

function onInput(e) {
  const val = Number(e.target.value)
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.ios-slider-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
}
.ios-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: var(--space-1);
  border-radius: var(--radius-xs);
  background: linear-gradient(to right, var(--color-blue) 0%, var(--color-blue) var(--ios-slider-fill), var(--fill-primary) var(--ios-slider-fill), var(--fill-primary) 100%);
  outline: none;
}
.ios-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: var(--space-7);
  height: var(--space-7);
  border-radius: 50%;
  background: var(--white);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border: none;
}
</style>
