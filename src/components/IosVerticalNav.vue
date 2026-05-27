<template>
  <nav class="ios-vertical-nav" :class="{ 'ios-vertical-nav--open': open }">
    <div class="ios-vertical-nav-header">
      <h2 class="ios-vertical-nav-title">{{ title }}</h2>
      <span v-if="subtitle" class="ios-vertical-nav-subtitle">{{ subtitle }}</span>
    </div>

    <div class="ios-vertical-nav-items">
      <template v-for="(item, idx) in items" :key="item.id || 'divider-' + idx">
        <div
          v-if="item.type === 'divider'"
          class="ios-vertical-nav-divider"
        />
        <a
          v-else
          class="ios-vertical-nav-item"
          :class="{ 'ios-vertical-nav-item--active': modelValue === item.id }"
          :href="item.to || '#'"
          @click.prevent="onSelect(item)"
        >
          <IosIcon v-if="item.icon" :name="item.icon" size="18" />
          <span class="ios-vertical-nav-item-label">{{ item.label }}</span>
        </a>
      </template>
    </div>

    <div class="ios-vertical-nav-footer">
      <slot name="footer" />
    </div>
  </nav>
</template>

<script setup>
/**
 * IosVerticalNav — Vertical sidebar navigation with items and divider support.
 *
 * @prop {Array<{id: string, label: string, icon?: string, to?: string, type?: 'divider'}>} [items=[]] - Navigation items
 * @prop {string} [modelValue=''] - Active item id (v-model)
 * @prop {string} [title=''] - Navigation header title
 * @prop {string} [subtitle=''] - Navigation header subtitle
 * @prop {boolean} [open=false] - Open/collapsed state
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on select (v-model)
 * @event {'select'} select - Emitted on select with full item object
 */
import IosIcon from './IosIcon.vue'

defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'select'])

function onSelect(item) {
  emit('update:modelValue', item.id)
  emit('select', item)
}
</script>

<style scoped>
.ios-vertical-nav {
  display: flex;
  flex-direction: column;
  width: 220px;
  min-height: 100vh;
  background: var(--glass-large-bg);
  backdrop-filter: blur(var(--blur-regular));
  -webkit-backdrop-filter: blur(var(--blur-regular));
  border-right: var(--separator-height) solid var(--separator);
  flex-shrink: 0;
}

.ios-vertical-nav-header {
  padding: var(--space-6) var(--space-5);
  border-bottom: var(--separator-height) solid var(--separator);
}

.ios-vertical-nav-title {
  font: var(--type-title3);
  color: var(--label-primary);
  margin: 0 0 var(--space-1);
}

.ios-vertical-nav-subtitle {
  font: var(--type-caption1);
  color: var(--label-tertiary);
}

.ios-vertical-nav-items {
  flex: 1;
  padding: var(--space-3) var(--space-2);
  overflow-y: auto;
}

.ios-vertical-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  color: var(--label-secondary);
  font: var(--type-subheadline);
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--duration-fast), color var(--duration-fast);
  border-left: 3px solid transparent;
  margin-bottom: 2px;
}

.ios-vertical-nav-item:hover {
  background: var(--fill-quaternary);
  color: var(--label-primary);
}

.ios-vertical-nav-item--active {
  background: var(--fill-tertiary);
  color: var(--color-blue);
  border-left-color: var(--color-blue);
}

.ios-vertical-nav-item--active .ios-vertical-nav-item-label {
  font-weight: var(--weight-semibold);
}

.ios-vertical-nav-divider {
  height: var(--separator-height);
  background: var(--separator);
  margin: var(--space-2) var(--space-4);
}

.ios-vertical-nav-footer {
  padding: var(--space-4) var(--space-5);
  border-top: var(--separator-height) solid var(--separator);
}
</style>
