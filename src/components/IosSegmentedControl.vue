<template>
  <div class="segmented-control" role="tablist">
    <button
      v-for="(label, i) in segments"
      :key="label"
      role="tab"
      class="segment text-subheadline"
      :class="{ active: modelValue === i }"
      :aria-selected="modelValue === i"
      @click="onSelect(i)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  segments: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'change'])

function onSelect(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>
