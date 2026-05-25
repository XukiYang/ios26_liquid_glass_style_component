<template>
  <button
    class="ios-btn"
    :class="[`ios-btn-${variant}`, `ios-btn-${size}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'filled' },
  size: { type: String, default: 'medium' },
  disabled: Boolean,
})

defineEmits(['click'])
</script>

<style scoped>
.ios-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  outline: none;
  border-radius: var(--radius-12);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--text-body);
  font-weight: var(--weight-semibold);
  white-space: nowrap;
  transition:
    transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1.0),
    opacity 0.1s ease-in,
    background-color 0.15s ease-out;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.ios-btn:active:not(:disabled) {
  transform: scale(0.97);
  opacity: 0.7;
}
.ios-btn:disabled { opacity: var(--opacity-disabled); pointer-events: none; cursor: not-allowed; }
.ios-btn:focus-visible { outline: 2px solid var(--color-blue); outline-offset: 2px; }

/* Sizes */
.ios-btn-small  { height: 34px; border-radius: var(--radius-lg); padding: 0 16px; font-size: var(--text-subheadline); min-width: 44px; }
.ios-btn-medium { height: 44px; border-radius: var(--radius-12); padding: 0 20px; min-width: 44px; }
.ios-btn-large  { height: 50px; border-radius: var(--radius-xl); padding: 0 24px; font-size: var(--text-callout); min-width: 44px; }

/* Variants */
.ios-btn-filled { background-color: var(--color-blue); color: var(--white); }
.ios-btn-gray { background-color: var(--fill-quaternary); color: var(--label-primary); }
.ios-btn-tinted { background-color: color-mix(in srgb, var(--color-blue) 15%, transparent); color: var(--color-blue); }
.ios-btn-plain { background-color: transparent; color: var(--color-blue); }
.ios-btn-plain:active:not(:disabled) { background-color: var(--fill-quaternary); }
.ios-btn-liquid-glass { background-color: rgba(116, 116, 128, 0.08); backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px); border-radius: var(--radius-full); color: var(--label-primary); }

/* Dark mode overrides */
[data-theme="dark"] .ios-btn-filled { background-color: #0091ff; }
[data-theme="dark"] .ios-btn-tinted { background-color: color-mix(in srgb, #0091ff 15%, transparent); color: #0091ff; }
[data-theme="dark"] .ios-btn-gray { background-color: rgba(118, 118, 128, 0.18); color: var(--label-primary); }
[data-theme="dark"] .ios-btn-plain { color: #0091ff; }
[data-theme="dark"] .ios-btn-liquid-glass { background-color: rgba(118, 118, 128, 0.18); color: var(--label-primary); }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ios-btn { transition: opacity 0.1s ease-in, background-color 0.15s ease-out; }
  .ios-btn:active:not(:disabled) { transform: none; }
}
</style>
