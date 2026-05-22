<template>
  <header class="ios-toolbar liquid-glass-large" :class="{ 'ios-collapsed': collapsed }">
    <div class="ios-toolbar-leading">
      <slot name="leading" />
    </div>
    <div class="ios-toolbar-title">{{ title }}</div>
    <div class="ios-toolbar-trailing">
      <slot name="trailing" />
    </div>
  </header>
  <div v-if="largeTitle && !collapsed" class="ios-toolbar-large-title">
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

<style scoped>
.ios-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--toolbar-height);
  padding: 0 var(--space-4);
  position: sticky;
  top: 0;
  z-index: 100;
}
.ios-toolbar-title {
  font-family: var(--font-family);
  font-size: var(--text-headline);
  line-height: var(--lh-headline);
  letter-spacing: var(--ls-headline);
  font-weight: var(--weight-semibold);
}
.ios-toolbar-leading,
.ios-toolbar-trailing { display: flex; gap: var(--space-2); min-width: 60px; }
.ios-toolbar-trailing { justify-content: flex-end; }
.ios-toolbar.ios-collapsed {
  box-shadow: 0 0.5px 0 0 var(--separator);
}
.ios-toolbar-large-title {
  padding: 0 var(--space-4) var(--space-2);
  font-family: var(--font-family);
  font-size: var(--text-large-title);
  line-height: var(--lh-large-title);
  letter-spacing: var(--ls-large-title);
  font-weight: var(--weight-bold);
}
</style>
