<template>
  <div
    class="ios-list-row"
    :class="{ 'ios-has-separator': separator }"
    :role="onclick ? 'button' : undefined"
    :tabindex="onclick ? 0 : undefined"
    @click="onclick"
    @keydown.enter="onclick"
  >
    <div v-if="$slots.leading" class="ios-list-row-leading">
      <slot name="leading" />
    </div>
    <div class="ios-list-row-content">
      <slot />
    </div>
    <div v-if="$slots.trailing" class="ios-list-row-trailing">
      <slot name="trailing" />
    </div>
    <div v-if="disclosure" class="ios-list-row-disclosure">›</div>
  </div>
</template>

<script setup>
defineProps({
  disclosure: Boolean,
  separator: { type: Boolean, default: true },
  onclick: Function,
})
</script>

<style scoped>
.ios-list-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--list-row-height);
  padding: var(--space-2) var(--space-4);
  cursor: default;
}
.ios-list-row.ios-has-separator {
  border-bottom: var(--separator-height) solid var(--separator);
}
.ios-list-row:last-child { border-bottom: none; }
.ios-list-row-content { flex: 1; }
.ios-list-row-leading { display: flex; align-items: center; }
.ios-list-row-trailing { text-align: right; }
.ios-list-row-disclosure { color: var(--label-tertiary); font-size: var(--text-body); }
</style>
