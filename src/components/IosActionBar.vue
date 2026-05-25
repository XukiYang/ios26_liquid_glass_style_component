<template>
  <div class="ios-action-bar">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="ios-action-bar-item"
      :class="{
        'ios-action-bar-item--active': isActive(item.id),
        'ios-has-separator': index < items.length - 1,
      }"
      role="button"
      tabindex="0"
      @click="select(item.id)"
      @keydown.enter="select(item.id)"
    >
      <span class="ios-action-bar-icon" :class="{ 'ios-action-bar-item--active': isActive(item.id) }">
        <IosIcon v-if="item.iconName" :name="item.iconName" size="20" stroke="currentColor" />
        <span v-else>{{ item.icon }}</span>
      </span>
      <span class="ios-action-bar-label" :class="{ 'ios-action-bar-item--active': isActive(item.id) }">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
/**
 * IosActionBar — Vertical action button group card.
 *
 * Renders a list of action rows (like iOS share sheet actions) inside a rounded
 * Liquid Glass card. Each row has an emoji icon on the left and a label on the
 * right. Supports `v-model` for tracking the active item.
 *
 * @param {Array<{id: string|number, icon: string, label: string, active?: boolean}>} items - Action items to display.
 * @param {string|number} [modelValue] - Currently active item id.
 *
 * @emits update:modelValue - Emits the clicked item id for v-model binding.
 * @emits change - Emits the clicked item id on user interaction.
 */
import IosIcon from './IosIcon.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

function isActive(id) {
  return props.modelValue !== null && props.modelValue !== undefined
    ? props.modelValue === id
    : false
}

function select(id) {
  emit('update:modelValue', id)
  emit('change', id)
}
</script>

<style scoped>
/* ---- Card container (width matches TableView content card) ---- */
.ios-action-bar {
  display: flex;
  flex-direction: column;
  margin: 0 var(--space-4);
  border-radius: var(--radius-lg);
  background-color: var(--bg-grouped-secondary);
  overflow: hidden;
}

/* ---- Item row ---- */
.ios-action-bar-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: background-color 0.15s ease, transform 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.ios-action-bar-item:active {
  background-color: var(--fill-secondary);
  transform: scale(0.98);
}

.ios-action-bar-item:hover {
  background-color: var(--fill-tertiary);
}

/* ---- Separator ---- */
.ios-action-bar-item.ios-has-separator {
  border-bottom: var(--separator-height) solid var(--separator);
}

/* ---- Icon ---- */
.ios-action-bar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-callout);
  line-height: 1;
  flex-shrink: 0;
  color: var(--label-primary);
  transition: color 0.2s ease;
}

.ios-action-bar-icon.ios-action-bar-item--active {
  color: var(--color-blue);
}

/* ---- Label ---- */
.ios-action-bar-label {
  flex: 1;
  font-family: var(--font-family);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-body);
  font-weight: var(--weight-regular);
  color: var(--label-primary);
  transition: color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ios-action-bar-label.ios-action-bar-item--active {
  color: var(--color-blue);
  font-weight: var(--weight-medium);
}
</style>
