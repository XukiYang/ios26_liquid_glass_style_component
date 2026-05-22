<template>
  <div class="textfield-wrapper">
    <label v-if="label" class="text-subheadline text-secondary">{{ label }}</label>
    <div class="textfield-input-wrapper">
      <input
        class="textfield text-body"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
      />
      <button
        v-if="clearable && modelValue"
        class="textfield-clear"
        @click="onClear"
        aria-label="Clear"
      >&times;</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: String,
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: Boolean,
  clearable: Boolean,
})

const emit = defineEmits(['update:modelValue', 'input'])

function onInput(e) {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('input', val)
}

function onClear() {
  emit('update:modelValue', '')
  emit('input', '')
}
</script>
