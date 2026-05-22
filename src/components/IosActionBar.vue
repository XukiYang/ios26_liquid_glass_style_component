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
      <span class="ios-action-bar-icon" :class="{ 'ios-action-bar-item--active': isActive(item.id) }">{{ item.icon }}</span>
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
/* ---- Card container (Liquid Glass) ---- */
.ios-action-bar {
  display: flex;
  flex-direction: column;
  border-radius: var(--glass-medium-radius);
  background: var(--fill-secondary);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: var(--border-hairline) solid var(--separator);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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
  transition: background 0.2s ease, transform 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.ios-action-bar-item:active {
  transform: scale(0.97);
}

.ios-action-bar-item:hover {
  background: var(--fill-tertiary);
}

/* ---- Separator ---- */
.ios-action-bar-item.ios-has-separator {
  border-bottom: var(--border-hairline) solid var(--separator);
}

/* ---- Icon (emoji placeholder) ---- */
.ios-action-bar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-6);
  height: var(--space-6);
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
  font-size: var(--text-subheadline);
  line-height: var(--lh-subheadline);
  letter-spacing: var(--ls-subheadline);
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
