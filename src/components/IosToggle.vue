<template>
  <label class="ios-toggle-wrapper">
    <span v-if="label" class="ios-toggle-label">{{ label }}</span>
    <button
      role="switch"
      class="ios-toggle"
      :class="{ 'ios-checked': modelValue }"
      :aria-checked="modelValue"
      :disabled="disabled"
      @click="onToggle"
    >
      <span class="ios-toggle-thumb"></span>
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
  if (props.disabled) return
  const val = !props.modelValue
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.ios-toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) 0;
  gap: var(--space-3);
}
.ios-toggle {
  position: relative;
  width: 51px;
  height: 31px;
  border-radius: var(--radius-2xl);
  border: none;
  background-color: var(--fill-primary);
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s;
  padding: 0;
}
.ios-toggle.ios-checked { background-color: var(--color-green); }
.ios-toggle-thumb {
  position: absolute;
  top: var(--radius-xs);
  left: var(--radius-xs);
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.ios-toggle.ios-checked .ios-toggle-thumb { transform: translateX(20px); }
.ios-toggle-label {
  font-family: var(--font-family);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-body);
}
</style>
