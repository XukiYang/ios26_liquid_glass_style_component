<template>
  <div
    class="list-row"
    :class="{ 'has-separator': separator }"
    :role="onclick ? 'button' : undefined"
    :tabindex="onclick ? 0 : undefined"
    @click="onclick"
    @keydown.enter="onclick"
  >
    <div v-if="$slots.leading" class="list-row-leading">
      <slot name="leading" />
    </div>
    <div class="list-row-content text-body">
      <slot />
    </div>
    <div v-if="$slots.trailing" class="list-row-trailing text-body text-secondary">
      <slot name="trailing" />
    </div>
    <div v-if="disclosure" class="list-row-disclosure">›</div>
  </div>
</template>

<script setup>
defineProps({
  disclosure: Boolean,
  separator: { type: Boolean, default: true },
  onclick: Function,
})
</script>
