<template>
  <div class="ios-textfield-wrapper">
    <label v-if="label" class="ios-textfield-label">{{ label }}</label>
    <div class="ios-textfield-input-wrapper">
      <input
        class="ios-textfield"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
      />
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
})

const emit = defineEmits(['update:modelValue', 'input'])

function onInput(e) {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('input', val)
}

</script>

<style scoped>
.ios-textfield-wrapper { display: flex; flex-direction: column; gap: var(--space-1); }
.ios-textfield-input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--fill-primary);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-3);
  gap: var(--space-2);
}
.ios-textfield {
  flex: 1;
  border: none;
  background: transparent;
  padding: var(--space-3) 0;
  outline: none;
  color: var(--label-primary);
  font-family: var(--font-family);
  font-size: var(--text-body);
}
.ios-textfield-label {
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
  line-height: var(--lh-subheadline);
  letter-spacing: var(--ls-subheadline);
  color: var(--label-secondary);
}
</style>
