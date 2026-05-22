<template>
  <div ref="trackRef" class="lgb-track" role="tablist">
    <!-- Liquid glass pill — CSS-transitioned slide -->
    <div
      ref="pillRef"
      class="lgb-pill"
      :style="pillStyle"
      aria-hidden="true"
    />
    <!-- Option buttons -->
    <button
      v-for="(item, i) in items"
      :key="item.id ?? i"
      role="tab"
      class="lgb-option"
      :class="{ 'lgb-active': activeIndex === i }"
      :aria-selected="activeIndex === i"
      @click="select(i)"
    >
      <span class="lgb-label">{{ item.label ?? item }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { usePillLiquidGlass } from '../composables/usePillLiquidGlass.js'

/* ---- Props & Emit ------------------------------------------------------- */
const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue', 'change'])

/* ---- Normalize options -------------------------------------------------- */
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
    measurePill(v)
  }
})

/* ---- Per-pill liquid glass (canvas SDF + SVG filter) -------------------- */
const { id: filterId, setSize } = usePillLiquidGlass()

/* ---- DOM refs ----------------------------------------------------------- */
const trackRef = ref(null)
const pillRef = ref(null)

/* ---- Pill position (CSS transition handles the animation) --------------- */
const pillLeft = ref(0)
const pillWidth = ref(0)

const pillStyle = computed(() => ({
  left: pillLeft.value + 'px',
  width: pillWidth.value + 'px',
  filter: `url(#${filterId})`,
}))

/* ---- Sync filter dimensions to pill's actual rendered size -------------- */
function syncFilterSize() {
  const pill = pillRef.value
  if (!pill) return
  const r = pill.getBoundingClientRect()
  if (r.width > 0 && r.height > 0) setSize(r.width, r.height)
}

/* ---- Measure button position inside track ------------------------------- */
function measurePill(index) {
  const track = trackRef.value
  if (!track) return
  const btns = track.querySelectorAll('.lgb-option')
  const btn = btns[index ?? activeIndex.value]
  if (!btn) return
  const tr = track.getBoundingClientRect()
  const br = btn.getBoundingClientRect()
  pillLeft.value = br.left - tr.left
  pillWidth.value = br.width
  // After position updates, sync filter to new pill size
  nextTick(syncFilterSize)
}

/* ---- Click handler ------------------------------------------------------ */
function select(index) {
  if (index === activeIndex.value) return
  activeIndex.value = index
  measurePill(index)
  emit('update:modelValue', index)
  emit('change', index)
}

/* ---- Lifecycle ---------------------------------------------------------- */
onMounted(() => {
  nextTick(() => {
    measurePill(activeIndex.value)
  })
})

onUnmounted(() => {
  // composable cleanup is handled via its own destroy if needed
})
</script>

<style scoped>
/* ---- Track: full capsule with Regular-level glass background ------------ */
.lgb-track {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 2px;
  gap: 2px;
  /* Regular glass material */
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  border-radius: 9999px;
  overflow: hidden;
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.3) inset,
    0 1px 4px rgba(0, 0, 0, 0.06);
}

/* ---- Glass pill indicator ----------------------------------------------- */
.lgb-pill {
  position: absolute;
  top: 2px;
  height: 36px;
  border-radius: 9999px;
  /* Semi-transparent glass body */
  background: rgba(255, 255, 255, 0.65);
  /* Inner highlight (top edge) for glass thickness */
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.7) inset,
    0 2px 8px rgba(0, 0, 0, 0.07),
    0 0 0 0.5px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(30px) contrast(1.05) saturate(1.1);
  -webkit-backdrop-filter: blur(30px) contrast(1.05) saturate(1.1);
  pointer-events: none;
  z-index: 0;
  /* Smooth slide — iOS style ease-out, no spring */
  transition:
    left 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
    width 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* ---- Options (text labels) ---------------------------------------------- */
.lgb-option {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 12px;
  border: none;
  background: none;
  color: var(--label-secondary);
  cursor: pointer;
  border-radius: 9999px;
  font-family: var(--font-family);
  white-space: nowrap;
  transition: color 0.25s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.lgb-option.lgb-active {
  color: var(--label-primary);
}

.lgb-label {
  font-size: var(--text-subheadline);
  font-weight: var(--weight-medium);
  letter-spacing: var(--ls-subheadline);
}

/* ---- Dark mode ---------------------------------------------------------- */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .lgb-track {
    background: rgba(0, 0, 0, 0.55);
    box-shadow:
      0 0 0 0.5px rgba(255, 255, 255, 0.08) inset,
      0 1px 4px rgba(0, 0, 0, 0.2);
  }

  :root:not([data-theme="light"]) .lgb-pill {
    background: rgba(255, 255, 255, 0.14);
    box-shadow:
      0 1px 0 0 rgba(255, 255, 255, 0.18) inset,
      0 2px 8px rgba(0, 0, 0, 0.3),
      0 0 0 0.5px rgba(255, 255, 255, 0.08);
  }

  :root:not([data-theme="light"]) .lgb-option {
    color: rgba(235, 235, 245, 0.55);
  }

  :root:not([data-theme="light"]) .lgb-option.lgb-active {
    color: #ffffff;
  }
}

[data-theme="dark"] .lgb-track {
  background: rgba(0, 0, 0, 0.55);
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.08) inset,
    0 1px 4px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .lgb-pill {
  background: rgba(255, 255, 255, 0.14);
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.18) inset,
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 0 0.5px rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .lgb-option {
  color: rgba(235, 235, 245, 0.55);
}

[data-theme="dark"] .lgb-option.lgb-active {
  color: #ffffff;
}
</style>
