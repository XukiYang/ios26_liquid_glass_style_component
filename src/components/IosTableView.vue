<template>
  <div
    class="ios-table-view"
    :class="[
      'ios-table-view--' + variant,
      { 'ios-table-view--inset': inset }
    ]"
  >
    <!-- Section Header -->
    <div v-if="header" class="ios-table-view-header">{{ header }}</div>

    <!-- Section Content Card -->
    <div class="ios-table-view-content">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="ios-table-view-row"
        :class="{
          'ios-table-view-row--active': modelValue === item.id,
          'ios-table-view-row--pressable': !!$attrs.onClick || modelValue !== undefined,
          'ios-table-view-row--separator': separator && index < items.length - 1,
        }"
        :style="rowIndentStyle(item)"
        role="button"
        :tabindex="0"
        @click="onSelect(item)"
        @keydown.enter="onSelect(item)"
        @keydown.space.prevent="onSelect(item)"
      >
        <!-- Leading: Icon -->
        <div v-if="item.icon || item.iconName" class="ios-table-view-leading">
          <IosIcon v-if="item.iconName" :name="item.iconName" size="20" stroke="var(--color-blue)" />
          <span v-else class="ios-table-view-icon">{{ item.icon }}</span>
        </div>

        <!-- Middle: Label + Subtitle -->
        <div class="ios-table-view-middle">
          <div class="ios-table-view-label">{{ item.label }}</div>
          <div v-if="item.subtitle" class="ios-table-view-subtitle">{{ item.subtitle }}</div>
        </div>

        <!-- Trailing: Disclosure -->
        <div v-if="item.disclosure !== false" class="ios-table-view-trailing">
          <span class="ios-table-view-disclosure">&rsaquo;</span>
        </div>
      </div>
    </div>

    <!-- Section Footer -->
    <div v-if="footer" class="ios-table-view-footer">{{ footer }}</div>
  </div>
</template>

<script setup>
import IosIcon from './IosIcon.vue'

/**
 * IosTableView — A grouped list / table view component styled after iOS.
 *
 * Supports two variants:
 * - `inset-grouped` (default): rounded card with surrounding margins
 * - `plain`: full-width list without card borders
 *
 * Use for TOC (table of contents), settings panels, or any itemised list.
 *
 * @prop {Array<{id: string|number, label: string, subtitle?: string, icon?: string, disclosure?: boolean, level?: number, indent?: number}>} items - List items to render
 * @prop {string|number} [modelValue] - Currently active item id (highlighted)
 * @prop {string} [header] - Section header text
 * @prop {string} [footer] - Section footer text
 * @prop {boolean} [inset=true] - Inset grouped style with rounded card and margins
 * @prop {boolean} [separator=true] - Show separators between rows
 * @prop {'inset-grouped'|'plain'} [variant='inset-grouped'] - Table view visual style
 *
 * @emit {string|number} update:modelValue - Emitted on row selection (v-model)
 * @emit {string|number} select - Emitted on row selection with item id
 */
defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  header: {
    type: String,
    default: '',
  },
  footer: {
    type: String,
    default: '',
  },
  inset: {
    type: Boolean,
    default: true,
  },
  separator: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: 'inset-grouped',
    validator: (v) => ['inset-grouped', 'plain'].includes(v),
  },
})

const emit = defineEmits([
  /** v-model — emitted on row selection with item id */
  'update:modelValue',
  /** Emitted on row selection with item id */
  'select',
])

function onSelect(item) {
  emit('update:modelValue', item.id)
  emit('select', item.id)
}

function rowIndentStyle(item) {
  const level = item.level || 0
  const indent = item.indent !== undefined ? item.indent : level * 16
  if (indent > 0) {
    return { paddingLeft: indent + 'px' }
  }
  return {}
}
</script>

<style scoped>
/* =========================================================================
   IosTableView — Variant: inset-grouped (default)
   ========================================================================= */
.ios-table-view--inset-grouped.ios-table-view--inset {
  padding: 0 var(--space-4);
}

.ios-table-view-header {
  padding: var(--space-2) var(--space-4) var(--space-1);
  font: var(--type-footnote);
  font-weight: var(--weight-medium);
  color: var(--label-secondary);
  text-transform: uppercase;
}

.ios-table-view-content {
  background-color: var(--bg-grouped-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* -- Plain variant -------------------------------------------------------- */
.ios-table-view--plain .ios-table-view-content {
  background-color: transparent;
  border-radius: 0;
}

.ios-table-view--plain .ios-table-view-header {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

/* -- Rows ----------------------------------------------------------------- */
.ios-table-view-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--list-row-height);
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
  transition: background-color var(--duration-fast) ease;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.ios-table-view-row--separator {
  border-bottom: var(--separator-height) solid var(--separator);
}

.ios-table-view-row:last-child {
  border-bottom: none;
}

.ios-table-view-row:hover {
  background-color: var(--fill-tertiary);
}

.ios-table-view-row:active,
.ios-table-view-row--active {
  background-color: var(--fill-secondary);
}

/* -- Leading (icon) ------------------------------------------------------- */
.ios-table-view-leading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ios-table-view-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-7);
  height: var(--space-7);
  font-size: var(--text-callout);
  color: var(--color-blue);
}

/* -- Middle (label + subtitle) -------------------------------------------- */
.ios-table-view-middle {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
}

.ios-table-view-label {
  font: var(--type-body);
  color: var(--label-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ios-table-view-row--active .ios-table-view-label {
  color: var(--color-blue);
  font-weight: var(--weight-semibold);
}

.ios-table-view-subtitle {
  font-size: var(--text-footnote);
  font-weight: var(--weight-regular);
  color: var(--label-secondary);
  line-height: var(--lh-footnote);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* -- Trailing (disclosure) ------------------------------------------------ */
.ios-table-view-trailing {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
}

.ios-table-view-disclosure {
  font-size: var(--text-body);
  color: var(--label-tertiary);
  line-height: 1;
}

/* -- Footer --------------------------------------------------------------- */
.ios-table-view-footer {
  padding: var(--space-1) var(--space-4) var(--space-2);
  font: var(--type-footnote);
  color: var(--label-secondary);
}
</style>
