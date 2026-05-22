<template>
  <div class="slider-wrapper">
    <div v-if="$slots.leading" class="slider-leading"><slot name="leading" /></div>
    <input
      type="range"
      class="slider"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput"
    />
    <div v-if="$slots.trailing" class="slider-trailing"><slot name="trailing" /></div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'change'])

function onInput(e) {
  const val = Number(e.target.value)
  emit('update:modelValue', val)
  emit('change', val)
}
</script>
