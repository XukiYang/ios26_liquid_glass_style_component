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
/**
 * IosSlider — iOS-style horizontal slider with leading/trailing slots.
 *
 * @prop {number} [modelValue=0] - Current value (v-model)
 * @prop {number} [min=0] - Minimum value
 * @prop {number} [max=100] - Maximum value
 * @prop {number} [step=1] - Step increment
 * @prop {boolean} [disabled=false] - Disabled state
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on input (v-model)
 * @event {'change'} change - Emitted on input with new value
 */
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
  background: linear-gradient(to right, var(--color-blue) 0%, var(--color-blue) var(--ios-slider-fill), var(--fill-tertiary) var(--ios-slider-fill), var(--fill-tertiary) 100%);
  outline: none;
}
.ios-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: var(--space-7);
  height: var(--space-7);
  border-radius: 50%;
  background: var(--white);
  box-shadow: var(--shadow-thumb);
  cursor: pointer;
  border: none;
}
</style>
