<template>
  <div class="ios-error-view">
    <!-- Default slot replaces entire content -->
    <slot>
      <!-- Error icon area -->
      <div class="ios-error-view-icon">
        <slot name="icon">
          <svg
            class="ios-error-view-icon-svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 8L50 48H6L28 8Z"
              fill="currentColor"
            />
            <rect x="26" y="22" width="4" height="16" rx="2" fill="currentColor" />
            <circle cx="28" cy="42" r="3" fill="currentColor" />
          </svg>
        </slot>
      </div>

      <!-- Text content -->
      <div class="ios-error-view-content">
        <h2 class="ios-error-view-title">{{ title }}</h2>
        <p v-if="message" class="ios-error-view-message">{{ message }}</p>
      </div>

      <!-- Action buttons -->
      <div class="ios-error-view-actions">
        <slot name="actions">
          <button
            v-if="showRetry"
            class="ios-error-view-btn ios-error-view-btn--retry"
            @click="$emit('retry')"
          >
            重试
          </button>
          <button
            v-if="showHome"
            class="ios-error-view-btn ios-error-view-btn--home"
            @click="$emit('go-home')"
          >
            返回首页
          </button>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup>
/**
 * @typedef {Object} IosErrorViewProps
 * @property {string}  [title='页面出错了']   - Error title text
 * @property {string}  [message='未知错误']    - Error description text
 * @property {boolean} [showRetry=true]       - Whether to show the retry button
 * @property {boolean} [showHome=true]        - Whether to show the home button
 */

defineProps({
  title: { type: String, default: '页面出错了' },
  message: { type: String, default: '未知错误' },
  showRetry: { type: Boolean, default: true },
  showHome: { type: Boolean, default: true },
})

/** @event {'retry'} retry - Emitted when the retry button is clicked */
/** @event {'go-home'} goHome - Emitted when the home button is clicked */
defineEmits(['retry', 'go-home'])
</script>

<style scoped>
.ios-error-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: var(--space-10) var(--space-6);
  text-align: center;
}

.ios-error-view-icon {
  margin-bottom: var(--space-6);
  opacity: var(--opacity-subtle);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-error-view-icon-svg {
  color: var(--label-secondary);
  display: block;
}

.ios-error-view-content {
  margin-bottom: var(--space-6);
}

.ios-error-view-title {
  font-family: var(--font-family);
  font-size: var(--text-title2);
  line-height: var(--lh-title2);
  letter-spacing: var(--ls-title2);
  font-weight: var(--weight-semibold);
  color: var(--label-primary);
  margin: 0;
}

.ios-error-view-message {
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
  line-height: var(--lh-subheadline);
  letter-spacing: var(--ls-subheadline);
  font-weight: var(--weight-regular);
  color: var(--label-secondary);
  margin: var(--space-2) 0 0;
}

.ios-error-view-actions {
  display: flex;
  flex-direction: row;
  gap: var(--space-3);
  align-items: center;
}

.ios-error-view-btn {
  font-family: var(--font-family);
  font-size: var(--text-subheadline);
  font-weight: var(--weight-semibold);
  border: none;
  border-radius: var(--radius-lg);
  padding: 10px 24px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s;
}

.ios-error-view-btn:hover {
  opacity: var(--opacity-hover);
}

.ios-error-view-btn:active {
  opacity: var(--opacity-muted);
}

.ios-error-view-btn--retry {
  background-color: var(--color-blue);
  color: var(--white);
}

.ios-error-view-btn--home {
  background-color: transparent;
  color: var(--color-blue);
}
</style>
