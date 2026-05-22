<template>
  <header class="toolbar liquid-glass-large" :class="{ collapsed }">
    <div class="toolbar-leading">
      <slot name="leading" />
    </div>
    <div class="toolbar-title text-headline">{{ title }}</div>
    <div class="toolbar-trailing">
      <slot name="trailing" />
    </div>
  </header>
  <div v-if="largeTitle && !collapsed" class="toolbar-large-title text-large-title emphasized" style="padding: 0 16px 8px;">
    {{ title }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  largeTitle: Boolean,
  scrollY: { type: Number, default: 0 },
})

const collapsed = computed(() => props.scrollY > 44)
</script>
