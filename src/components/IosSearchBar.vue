<template>
  <div class="ios-searchbar" :class="{ 'ios-searchbar-focused': focused }">
    <div class="ios-searchbar-field">
      <span class="ios-searchbar-icon">🔍</span>
      <input
        class="ios-searchbar-input"
        type="search"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        @focus="focused = true"
        @blur="onBlur"
        @keydown.enter="onSubmit"
      />
    </div>
    <button
      v-if="focused"
      class="ios-searchbar-cancel"
      @mousedown.prevent="onCancel"
    >Cancel</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search' },
})

const emit = defineEmits(['update:modelValue', 'input', 'submit', 'cancel'])

const focused = ref(false)

function onInput(e) {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('input', val)
}

function onSubmit() {
  emit('submit', props.modelValue)
}

function onBlur() {
  setTimeout(() => { focused.value = false }, 200)
}

function onCancel() {
  emit('update:modelValue', '')
  emit('input', '')
  emit('cancel')
  focused.value = false
}
</script>

<style scoped>
.ios-searchbar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.ios-searchbar-field {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background-color: var(--fill-primary);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-3);
}
.ios-searchbar-icon { font-size: var(--text-callout); }
.ios-searchbar-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: var(--space-3) 0;
  outline: none;
  color: var(--label-primary);
  font-family: var(--font-family);
  font-size: var(--text-body);
}
.ios-searchbar-cancel {
  background: none;
  border: none;
  color: var(--color-blue);
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
}
</style>
