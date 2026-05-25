<template>
  <nav class="ios-tabbar">
    <button
      v-for="item in items"
      :key="item.id"
      class="ios-tabbar-item"
      :class="{ 'ios-tabbar-active': modelValue === item.id }"
      @click="onSelect(item.id)"
    >
      <span class="ios-tabbar-icon">{{ item.icon }}</span>
      <span class="ios-tabbar-label">{{ item.label }}</span>
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

<style scoped>
.ios-tabbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  height: var(--tabbar-height);
  padding: var(--space-1) 0 var(--space-2);
  position: sticky;
  bottom: 0;
  z-index: 100;
  background: rgba(250, 250, 250, 0.7);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}
.ios-tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--label-secondary);
  padding: var(--space-1) var(--space-3);
  -webkit-tap-highlight-color: transparent;
}
.ios-tabbar-item.ios-tabbar-active { color: var(--color-blue); }
.ios-tabbar-icon { font-size: 24px; line-height: 1; }
.ios-tabbar-label {
  font-family: var(--font-family);
  font-size: var(--text-caption2);
  line-height: var(--lh-caption2);
  letter-spacing: var(--ls-caption2);
}

[data-theme="dark"] .ios-tabbar {
  background: rgba(0, 0, 0, 0.8);
}
</style>
