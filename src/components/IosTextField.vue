<template>
  <div class="ios-textfield-wrapper" :class="{ 'ios-textfield-focused': focused }">
    <label v-if="label" class="ios-textfield-label">{{ label }}</label>
    <div class="ios-textfield-input-wrapper">
      <IosIcon
        v-if="leadingIcon"
        :name="leadingIcon"
        size="16"
        class="ios-textfield-leading"
      />
      <input
        class="ios-textfield"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
        @focus="focused = true"
        @blur="focused = false"
      />
      <button
        v-if="clearable && modelValue"
        class="ios-textfield-clear"
        tabindex="-1"
        @mousedown.prevent="onClear"
      >
        <IosIcon name="close" size="14" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IosIcon from './IosIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: String,
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: Boolean,
  /** Icon name for a leading icon inside the input */
  leadingIcon: String,
  /** Show a clear button when input has value */
  clearable: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'input', 'clear'])

const focused = ref(false)

function onInput(e) {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('input', val)
}

function onClear() {
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
}
</script>

<style scoped>
.ios-textfield-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.ios-textfield-input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--fill-tertiary);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-3);
  gap: var(--space-2);
  box-shadow: inset 0 0 0 0 transparent;
  transition: box-shadow 0.25s ease;
}

.ios-textfield-focused .ios-textfield-input-wrapper {
  box-shadow: inset 0 0 0 1.5px var(--color-blue);
}

.ios-textfield-leading {
  flex-shrink: 0;
  color: var(--label-tertiary);
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
  transition: color 0.2s ease;
}

.ios-textfield-focused .ios-textfield-label {
  color: var(--color-blue);
}

.ios-textfield-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: var(--fill-tertiary);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  color: var(--label-secondary);
  transition: opacity 0.2s ease;
}
</style>
