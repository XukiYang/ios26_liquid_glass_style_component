<template>
  <div class="ios-tag-input" ref="containerRef">
    <input
      class="ios-tag-input-field"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @focus="showDropdown = true"
      @keydown.enter.prevent="onEnter"
      @keydown.escape="showDropdown = false"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
    />
    <div v-show="showDropdown && filteredOptions.length" class="ios-tag-input-dropdown">
      <div
        v-for="(option, idx) in filteredOptions"
        :key="option"
        class="ios-tag-input-option"
        :class="{
          'ios-tag-input-option--active': idx === activeIndex,
          'ios-tag-input-option--new': !existingSet.has(option),
        }"
        @mousedown.prevent="selectOption(option)"
      >
        <span>{{ option }}</span>
        <span v-if="!existingSet.has(option)" class="ios-tag-input-new-badge">新增</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)
const showDropdown = ref(false)
const activeIndex = ref(-1)
const containerRef = ref(null)

const existingSet = computed(() => new Set(props.options))

const filteredOptions = computed(() => {
  if (!inputValue.value) return props.options
  const q = inputValue.value.toLowerCase()
  return props.options.filter(o => o.toLowerCase().includes(q))
})

function onInput(e) {
  inputValue.value = e.target.value
  emit('update:modelValue', inputValue.value)
  activeIndex.value = -1
}

function selectOption(option) {
  inputValue.value = option
  emit('update:modelValue', option)
  showDropdown.value = false
}

function onEnter() {
  if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
    selectOption(filteredOptions.value[activeIndex.value])
  } else {
    showDropdown.value = false
  }
}

function onArrowDown() {
  if (activeIndex.value < filteredOptions.value.length - 1) activeIndex.value++
}

function onArrowUp() {
  if (activeIndex.value > 0) activeIndex.value--
}

function handleClickOutside(e) {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    showDropdown.value = false
  }
}

watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
.ios-tag-input {
  position: relative;
  width: 100%;
  font-family: var(--font-family);
}

.ios-tag-input-field {
  width: 100%;
  padding: var(--space-3) var(--space-3);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-family);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  color: var(--label-primary);
  background: var(--fill-tertiary);
  outline: none;
  transition: box-shadow 0.25s ease;
}

.ios-tag-input-field:focus {
  box-shadow: inset 0 0 0 1.5px var(--color-blue);
}

.ios-tag-input-field::placeholder {
  color: var(--label-tertiary);
}

.ios-tag-input-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 2px;
  background: var(--bg-primary);
  border: var(--separator-height) solid var(--separator);
  border-radius: var(--radius-md);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.ios-tag-input-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-subheadline);
  color: var(--label-primary);
  cursor: pointer;
  transition: background-color 0.1s;
}

.ios-tag-input-option:hover,
.ios-tag-input-option--active {
  background: var(--fill-tertiary);
}

.ios-tag-input-option--new {
  color: var(--label-primary);
}

.ios-tag-input-new-badge {
  font-size: var(--text-caption2);
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-blue) 15%, transparent);
  color: var(--color-blue);
  margin-left: var(--space-2);
}
</style>
