<template>
  <svg
    class="ios-icon"
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <use :href="'#' + name" />
  </svg>
</template>

<script setup>
defineProps({
  /** Icon identifier (must exist in the IconPark sprite) */
  name: { type: String, required: true },
  /** Icon width / height in pixels */
  size: { type: [Number, String], default: 20 },
})
</script>

<style scoped>
.ios-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
