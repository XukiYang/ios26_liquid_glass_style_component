<template>
  <div class="ios-list-section">
    <div v-if="header" class="ios-list-section-header">{{ header }}</div>
    <div class="ios-list-section-content">
      <slot />
    </div>
    <div v-if="footer" class="ios-list-section-footer">{{ footer }}</div>
  </div>
</template>

<script setup>
/**
 * IosListSection — Grouped list section wrapper with optional header/footer.
 *
 * @prop {string} [header] - Section header text (uppercase)
 * @prop {string} [footer] - Section footer text
 */
defineProps({
  header: String,
  footer: String,
})
</script>

<style scoped>
.ios-list-section { margin-bottom: var(--space-8); }
.ios-list-section-header {
  padding: var(--space-2) var(--space-4) var(--space-1);
  text-transform: uppercase;
}
.ios-list-section-content {
  background-color: var(--bg-grouped-secondary);
  border-radius: var(--radius-lg);
  margin: 0 var(--space-4);
  overflow: hidden;
}
.ios-list-section-footer {
  padding: var(--space-1) var(--space-4) var(--space-2);
}
</style>
