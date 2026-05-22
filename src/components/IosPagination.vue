<template>
  <nav class="ios-pagination" aria-label="分页导航">
    <button
      class="ios-pagination-btn ios-pagination-prev"
      :class="{ 'ios-pagination-disabled': isFirstPage }"
      :disabled="disabled || isFirstPage"
      aria-label="上一页"
      @click="goTo(modelValue - 1)"
    >
      &lt;
    </button>

    <template v-for="(item, i) in pageNumbers" :key="i">
      <button
        v-if="item !== '...'"
        class="ios-pagination-btn ios-pagination-num"
        :class="{ 'ios-pagination-active': item === modelValue }"
        :disabled="disabled"
        :aria-current="item === modelValue ? 'page' : undefined"
        :aria-label="'第 ' + item + ' 页'"
        @click="goTo(item)"
      >
        {{ item }}
      </button>
      <span v-else class="ios-pagination-ellipsis" aria-hidden="true">&hellip;</span>
    </template>

    <button
      class="ios-pagination-btn ios-pagination-next"
      :class="{ 'ios-pagination-disabled': isLastPage }"
      :disabled="disabled || isLastPage"
      aria-label="下一页"
      @click="goTo(modelValue + 1)"
    >
      &gt;
    </button>
  </nav>
</template>

<script setup>
/**
 * IosPagination — iOS 26 Liquid Glass pagination control.
 *
 * @prop {number} model-value — current page number (1-based)
 * @prop {number} total — total number of items
 * @prop {number} page-size — items per page
 * @prop {number} max-visible — max page buttons to show before collapsing with ellipsis (0 = show all)
 * @prop {boolean} disabled — disable all interactions
 *
 * @event update:modelValue — emitted when page changes (v-model)
 * @event change — emitted when page changes
 */
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 10 },
  maxVisible: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const curPage = computed(() => props.modelValue)

const pages = computed(() => {
  return Math.max(1, Math.ceil(props.total / props.pageSize))
})

const isFirstPage = computed(() => curPage.value <= 1)
const isLastPage = computed(() => curPage.value >= pages.value)

/**
 * Build the array of items to render for the page number bar.
 *
 * When maxVisible is 0 (default) all page numbers are shown.
 * Otherwise the list is collapsed so only the first, last, and a window
 * around the current page are visible; gaps are replaced with '...'.
 */
const pageNumbers = computed(() => {
  const totalPages = pages.value
  const maxVis = props.maxVisible

  if (totalPages <= 1) return []

  // No collapsing — show every page number
  if (!maxVis || maxVis <= 0 || maxVis >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const result = []
  const half = Math.floor((maxVis - 2) / 2)
  const cur = curPage.value

  // Always include first page
  result.push(1)

  let rangeStart = Math.max(2, cur - half)
  let rangeEnd = Math.min(totalPages - 1, cur + half)

  // Adjust range to fill maxVis slots when near boundaries
  const needed = maxVis - 2 // slots after first and before last
  const available = rangeEnd - rangeStart + 1
  if (available < needed) {
    if (rangeStart === 2) {
      rangeEnd = Math.min(totalPages - 1, rangeEnd + (needed - available))
    } else {
      rangeStart = Math.max(2, rangeStart - (needed - available))
    }
  }

  if (rangeStart > 2) {
    result.push('...')
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    result.push(i)
  }

  if (rangeEnd < totalPages - 1) {
    result.push('...')
  }

  // Always include last page
  if (totalPages > 1) {
    result.push(totalPages)
  }

  return result
})

function goTo(page) {
  if (props.disabled) return
  if (page < 1 || page > pages.value) return
  if (page === curPage.value) return

  emit('update:modelValue', page)
  emit('change', page)
}
</script>

<style scoped>
.ios-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  font-family: var(--font-family);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.ios-pagination-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--space-8);
  height: var(--space-8);
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--label-secondary);
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
  font-weight: var(--weight-medium);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, opacity 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.ios-pagination-btn:hover:not(.ios-pagination-active):not(.ios-pagination-disabled) {
  background-color: var(--fill-secondary);
}

.ios-pagination-btn:active:not(.ios-pagination-active):not(.ios-pagination-disabled) {
  background-color: var(--fill-primary);
}

.ios-pagination-btn.ios-pagination-active {
  background-color: var(--color-blue);
  color: var(--white);
  cursor: default;
}

.ios-pagination-btn.ios-pagination-disabled {
  opacity: var(--opacity-subtle);
  cursor: not-allowed;
  pointer-events: none;
}

.ios-pagination-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--space-8);
  height: var(--space-8);
  font-family: var(--font-family);
  color: var(--label-tertiary);
  font-size: var(--text-subheadline);
  pointer-events: none;
}
</style>
