<template>
  <div class="ios-capsule-track" role="tablist">
    <div
      ref="pillRef"
      class="ios-capsule-pill"
      :style="pillStyle"
      aria-hidden="true"
    />
    <button
      v-for="(item, i) in items"
      :key="item.id ?? i"
      role="tab"
      class="ios-capsule-option"
      :class="{ 'ios-capsule-active': activeIndex === i }"
      :aria-selected="activeIndex === i"
      @click="select(i)"
    >
      <IosIcon v-if="item.iconName" :name="item.iconName" :size="16" />
      <span class="ios-capsule-label">{{ item.label ?? item }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import IosIcon from './IosIcon.vue'

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'change'])

const items = computed(() =>
  props.options.map((o, i) =>
    typeof o === 'string'
      ? { id: String(i), label: o }
      : { id: o.id ?? String(i), label: o.label, ...o },
  ),
)

const activeIndex = ref(props.modelValue)
watch(() => props.modelValue, (v) => {
  if (v !== activeIndex.value) {
    activeIndex.value = v
    nextTick(() => measurePill(v))
  }
})

const pillRef = ref(null)
const pillX = ref(0)
const pillW = ref(0)

const pillStyle = computed(() => ({
  transform: `translateX(${pillX.value}px)`,
  width: pillW.value + 'px',
}))

function measurePill(index) {
  const pill = pillRef.value
  if (!pill) return
  const track = pill.parentElement
  const btns = track.querySelectorAll('.ios-capsule-option')
  const btn = btns[index]
  if (!btn) return
  const tr = track.getBoundingClientRect()
  const br = btn.getBoundingClientRect()
  pillX.value = br.left - tr.left
  pillW.value = br.width
}

function select(index) {
  if (index === activeIndex.value) return
  activeIndex.value = index
  measurePill(index)
  emit('update:modelValue', index)
  emit('change', index)
}

let resizeObserver = null

onMounted(() => {
  nextTick(() => measurePill(activeIndex.value))
  const track = pillRef.value?.parentElement
  if (track) {
    resizeObserver = new ResizeObserver(() => measurePill(activeIndex.value))
    resizeObserver.observe(track)
  }
})

onUnmounted(() => resizeObserver?.disconnect())
</script>

<style scoped>
.ios-capsule-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 2px;
  background: var(--fill-tertiary);
  border-radius: var(--radius-full);
}

.ios-capsule-pill {
  position: absolute;
  top: 2px;
  height: calc(100% - 4px);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
  box-shadow: var(--shadow-pill);
  transition: transform var(--duration-slow) var(--ease-spring),
              width var(--duration-slow) var(--ease-spring);
}

.ios-capsule-option {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 var(--space-3);
  border: none;
  background: none;
  color: var(--label-secondary);
  cursor: pointer;
  border-radius: var(--radius-full);
  font-family: var(--font-family);
  white-space: nowrap;
  transition: color var(--duration-normal) ease-out;
  gap: 4px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.ios-capsule-option.ios-capsule-active {
  color: var(--label-primary);
}

.ios-capsule-label {
  font: var(--type-footnote);
  font-weight: var(--weight-semibold);
}

[data-theme="dark"] .ios-capsule-pill {
  background: var(--pill-indicator-bg-dark);
  box-shadow: none;
}
</style>
