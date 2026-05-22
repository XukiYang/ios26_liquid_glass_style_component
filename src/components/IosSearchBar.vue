<template>
  <div class="searchbar" :class="{ focused }">
    <div class="searchbar-field">
      <span class="searchbar-icon text-tertiary">🔍</span>
      <input
        class="searchbar-input text-body"
        type="search"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        @focus="focused = true"
        @keydown.enter="onSubmit"
      />
    </div>
    <button
      v-if="focused"
      class="searchbar-cancel text-body"
      @click="onCancel"
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

function onCancel() {
  emit('update:modelValue', '')
  emit('input', '')
  emit('cancel')
  focused.value = false
}
</script>
