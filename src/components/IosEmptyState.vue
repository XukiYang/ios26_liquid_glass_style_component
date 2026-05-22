<template>
  <div class="ios-empty-state">
    <!-- Icon area -->
    <div class="ios-empty-state-icon">
      <slot name="icon">
        <svg
          v-if="icon"
          class="ios-empty-state-icon-svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8zm0 29.333c-7.364 0-13.333-5.97-13.333-13.333S16.636 10.667 24 10.667 37.333 16.636 37.333 24 31.364 37.333 24 37.333zm0-20a2 2 0 00-2 2v8a2 2 0 004 0v-8a2 2 0 00-2-2zm0 12a2 2 0 100 4 2 2 0 000-4z"
            fill="currentColor"
          />
        </svg>
      </slot>
    </div>

    <!-- Text content -->
    <div class="ios-empty-state-content">
      <slot>
        <h2 class="ios-empty-state-title">{{ title }}</h2>
        <p v-if="description" class="ios-empty-state-description">{{ description }}</p>
      </slot>
    </div>

    <!-- Action button -->
    <div class="ios-empty-state-action">
      <slot name="action">
        <button
          v-if="actionText"
          class="ios-empty-state-action-btn"
          @click="$emit('action')"
        >
          {{ actionText }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
/**
 * IosEmptyState — Centered empty state placeholder with icon, title, description, and action button.
 *
 * @prop {string} [icon] - Icon name identifier for the default SVG icon
 * @prop {string} [title='暂无数据'] - Heading text for the empty state
 * @prop {string} [description] - Subtitle / description text
 * @prop {string} [actionText] - Text for the action button (hidden if omitted)
 *
 * @event {'action'} action - Emitted when the action button is clicked
 */
defineProps({
  icon: String,
  title: { type: String, default: '暂无数据' },
  description: String,
  actionText: String,
})

defineEmits(['action'])
</script>

<style scoped>
.ios-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-10) var(--space-6);
  text-align: center;
}

.ios-empty-state-icon {
  margin-bottom: var(--space-4);
  opacity: var(--opacity-disabled);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-empty-state-icon-svg {
  color: var(--label-secondary);
  display: block;
}

.ios-empty-state-content {
  margin-bottom: var(--space-5);
}

.ios-empty-state-title {
  font-family: var(--font-family);
  font-size: var(--text-title2);
  line-height: var(--lh-title2);
  letter-spacing: var(--ls-title2);
  font-weight: var(--weight-semibold);
  color: var(--label-primary);
  margin: 0;
}

.ios-empty-state-description {
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
  line-height: var(--lh-subheadline);
  letter-spacing: var(--ls-subheadline);
  font-weight: var(--weight-regular);
  color: var(--label-secondary);
  margin: var(--space-2) 0 0;
}

.ios-empty-state-action {
  margin-top: var(--space-2);
}

.ios-empty-state-action-btn {
  font-family: var(--font-family);
  font-size: var(--text-callout);
  line-height: var(--lh-callout);
  letter-spacing: var(--ls-callout);
  font-weight: var(--weight-semibold);
  color: var(--color-blue);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--space-2) var(--space-4);
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s;
}

.ios-empty-state-action-btn:hover {
  opacity: var(--opacity-hover);
}

.ios-empty-state-action-btn:active {
  opacity: var(--opacity-muted);
}
</style>
