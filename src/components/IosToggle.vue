<template>
  <label class="ios-toggle-wrapper">
    <span v-if="label" class="ios-toggle-label">{{ label }}</span>
    <button
      ref="trackRef"
      role="switch"
      class="ios-toggle"
      :class="{ 'ios-checked': modelValue }"
      :aria-checked="modelValue"
      :disabled="disabled"
      @click="onToggle"
    >
      <span ref="thumbRef" class="ios-toggle-thumb"></span>
    </button>
  </label>
</template>

<script setup>
/**
 * IosToggle — iOS-style toggle switch with v-model support.
 *
 * @prop {boolean} [modelValue=false] - Toggle state (v-model)
 * @prop {boolean} [disabled=false] - Disabled state
 * @prop {string} [label] - Optional label text displayed beside the toggle
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on toggle (v-model)
 * @event {'change'} change - Emitted on toggle with new value
 */
import { ref, watch } from 'vue'
import { useGsap } from '../composables/useGsap.js'

const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  label: String,
})

const emit = defineEmits(['update:modelValue', 'change'])

const { tween, reducedMotion, SPRING_TIGHT, DURATION } = useGsap()
const trackRef = ref(null)
const thumbRef = ref(null)

watch(() => props.modelValue, (checked) => {
  if (!trackRef.value || !thumbRef.value) return
  const d = reducedMotion ? 0 : DURATION.slow
  tween(trackRef.value, {
    backgroundColor: checked ? 'var(--color-green)' : 'var(--fill-secondary)',
    duration: d,
    ease: 'power2.out',
  })
  tween(thumbRef.value, {
    x: checked ? 20 : 0,
    duration: d,
    ease: SPRING_TIGHT.ease,
  })
}, { immediate: true })

function onToggle() {
  if (props.disabled) return
  const val = !props.modelValue
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.ios-toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) 0;
  gap: var(--space-3);
}
.ios-toggle {
  position: relative;
  width: 51px;
  height: 31px;
  border-radius: 15.5px;
  border: none;
  background-color: var(--fill-secondary);
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
}
.ios-toggle.ios-checked { background-color: var(--color-green); }
.ios-toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: var(--white);
  box-shadow: var(--shadow-sm);
}
.ios-toggle-label {
  font: var(--type-body);
}
</style>
