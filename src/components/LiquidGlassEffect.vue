<template>
  <div style="display:none" />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { createLiquidGlass } from '../composables/useLiquidGlass.js'

let shader = null

onMounted(() => {
  shader = createLiquidGlass(document.body, { width: 320, height: 220 })
})

onUnmounted(() => {
  if (shader) shader.destroy()
})
</script>
