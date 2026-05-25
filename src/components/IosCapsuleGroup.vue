<template>
  <div class="ios-lgb-track" role="tablist">
    <div
      ref="pillRef"
      class="ios-lgb-pill"
      :style="pillStyle"
      aria-hidden="true"
    />
    <button
      v-for="(item, i) in items"
      :key="item.id ?? i"
      role="tab"
      class="ios-lgb-option"
      :class="{ 'ios-lgb-active': activeIndex === i }"
      :aria-selected="activeIndex === i"
      @click="select(i)"
    >
      <span class="ios-lgb-label">{{ item.label ?? item }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

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
  const btns = track.querySelectorAll('.ios-lgb-option')
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
.ios-lgb-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 2px;
  background: var(--fill-tertiary);
  border-radius: var(--radius-full);
}

.ios-lgb-pill {
  position: absolute;
  top: 2px;
  height: calc(100% - 4px);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
  box-shadow:
    0 3px 8px rgba(0, 0, 0, 0.12),
    0 3px 1px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1.0),
              width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1.0);
}

.ios-lgb-option {
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
  transition: color 0.2s ease-out;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.ios-lgb-option.ios-lgb-active {
  color: var(--label-primary);
}

.ios-lgb-label {
  font-size: var(--text-footnote);
  font-weight: var(--weight-semibold);
  line-height: var(--lh-footnote);
}

[data-theme="dark"] .ios-lgb-pill {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: none;
}
</style>
