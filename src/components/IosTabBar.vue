<template>
  <nav class="tabbar liquid-glass-large">
    <button
      v-for="item in items"
      :key="item.id"
      class="tabbar-item"
      :class="{ active: modelValue === item.id }"
      @click="onSelect(item.id)"
    >
      <span class="tabbar-icon">{{ item.icon }}</span>
      <span class="tabbar-label text-caption2">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'change'])

function onSelect(id) {
  emit('update:modelValue', id)
  emit('change', id)
}
</script>
