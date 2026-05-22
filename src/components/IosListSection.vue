<template>
  <div class="list-section">
    <div v-if="header" class="list-section-header text-footnote text-secondary">{{ header }}</div>
    <div class="list-section-content">
      <slot />
    </div>
    <div v-if="footer" class="list-section-footer text-footnote text-secondary">{{ footer }}</div>
  </div>
</template>

<script setup>
defineProps({
  header: String,
  footer: String,
})
</script>
