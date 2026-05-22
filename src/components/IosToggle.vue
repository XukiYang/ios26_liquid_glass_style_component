<template>
  <label class="toggle-wrapper">
    <span v-if="label" class="text-body">{{ label }}</span>
    <button
      role="switch"
      class="toggle"
      :class="{ checked: modelValue }"
      :aria-checked="modelValue"
      :disabled="disabled"
      @click="onToggle"
    >
      <span class="toggle-thumb"></span>
    </button>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  label: String,
})

const emit = defineEmits(['update:modelValue', 'change'])

function onToggle() {
  const val = !props.modelValue
  emit('update:modelValue', val)
  emit('change', val)
}
</script>
