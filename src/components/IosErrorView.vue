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
          <IosButton
            v-if="showRetry"
            variant="filled"
            size="small"
            @click="$emit('retry')"
          >
            重试
          </IosButton>
          <IosButton
            v-if="showHome"
            variant="plain"
            size="small"
            @click="$emit('go-home')"
          >
            返回首页
          </IosButton>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup>
import IosButton from './IosButton.vue'

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
  font: var(--type-title2);
  color: var(--label-primary);
  margin: 0;
}

.ios-error-view-message {
  font: var(--type-subheadline);
  color: var(--label-secondary);
  margin: var(--space-2) 0 0;
}

.ios-error-view-actions {
  display: flex;
  flex-direction: row;
  gap: var(--space-3);
  align-items: center;
}
</style>
