<template>
  <button
    class="btn"
    :class="[`btn-${variant}`, `btn-${size}`]"
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
