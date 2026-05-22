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
  gap: var(--space-2);
  border: none;
  outline: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
  font-weight: var(--weight-semibold);
  transition: opacity 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.ios-btn:disabled { opacity: var(--opacity-disabled); pointer-events: none; }
.ios-btn-small { padding: 6px 12px; min-height: 28px; font-size: var(--text-footnote); }
.ios-btn-medium { padding: 8px 16px; min-height: 36px; }
.ios-btn-large { padding: 12px 20px; min-height: 50px; font-size: var(--text-body); }
.ios-btn-filled { background-color: var(--color-blue); color: var(--white); }
.ios-btn-gray { background-color: var(--fill-primary); color: var(--color-blue); }
.ios-btn-tinted { background-color: color-mix(in srgb, var(--color-blue) 15%, transparent); color: var(--color-blue); }
.ios-btn-plain { background-color: transparent; color: var(--color-blue); }
.ios-btn-liquid-glass { background-color: var(--glass-medium-bg); backdrop-filter: blur(40px); color: var(--label-primary); }
</style>
