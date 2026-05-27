<template>
  <span
    class="ios-chip"
    :class="[`ios-chip-${size}`, { 'ios-chip-active': active, 'ios-chip-disabled': disabled }]"
  >
    <slot />
  </span>
</template>

<script setup>
/**
 * IosChip — A pill-shaped chip/tag for the iOS 26 Liquid Glass component library.
 *
 * @prop {boolean} [active=false] - Active/highlighted state (blue fill + glow)
 * @prop {'sm'|'md'|'lg'} [size='md'] - Chip size preset
 * @prop {boolean} [disabled=false] - Disabled state (dimmed, no interaction)
 */
defineProps({
  active: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: { type: Boolean, default: false },
})
</script>

<style scoped>
.ios-chip {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-full);
  background-color: var(--fill-secondary);
  color: var(--label-secondary);
  font-family: var(--font-family);
  font-weight: var(--weight-medium);
  cursor: default;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all var(--duration-normal);
  white-space: nowrap;
}

/* ---- Sizes ---- */
.ios-chip-sm  { padding: 4px 10px; font-size: var(--text-caption1);  line-height: var(--lh-caption1); }
.ios-chip-md  { padding: 6px 14px; font-size: var(--text-footnote);  line-height: var(--lh-footnote); }
.ios-chip-lg  { padding: 8px 18px; font-size: var(--text-subheadline); line-height: var(--lh-subheadline); }

/* ---- Hover (non-active) ---- */
.ios-chip:not(.ios-chip-active):hover {
  background-color: var(--fill-tertiary);
  color: var(--label-primary);
}

/* ---- Active ---- */
.ios-chip-active {
  background-color: color-mix(in srgb, var(--color-blue) 15%, transparent);
  color: var(--color-blue);
}

/* ---- Disabled ---- */
.ios-chip-disabled {
  opacity: var(--opacity-disabled);
  pointer-events: none;
}
</style>
