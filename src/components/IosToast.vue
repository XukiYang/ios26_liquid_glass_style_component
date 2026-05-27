<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="ios-toast" class="ios-toast-container" role="status" aria-live="polite">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="ios-toast"
        :class="[`ios-toast--${toast.type}`]"
      >
        <span class="ios-toast-indicator"></span>
        <span class="ios-toast-message">{{ toast.message }}</span>
        <button class="ios-toast-close" @click="removeToast(toast.id)" aria-label="关闭">&times;</button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { useToast } from '../composables/useToast.js'

const { toasts, removeToast } = useToast()
</script>

<style scoped>
.ios-toast-container {
  position: fixed;
  top: var(--safe-area-top, 59px);
  right: var(--content-inset, 16px);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  z-index: 10000;
  pointer-events: none;
  max-width: 360px;
}

.ios-toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background-color: var(--fill-primary);
  backdrop-filter: blur(var(--blur-regular));
  -webkit-backdrop-filter: blur(var(--blur-regular));
  border: var(--border-hairline) solid var(--separator);
  box-shadow: var(--shadow-md);
  pointer-events: auto;
  transition: background-color var(--duration-slow);
}

/* ---- Indicator bar ------------------------------------------------------ */
.ios-toast-indicator {
  flex-shrink: 0;
  width: 3px;
  height: 24px;
  border-radius: var(--radius-xs);
  background-color: var(--color-blue);
}

.ios-toast--success .ios-toast-indicator {
  background-color: var(--color-green);
}

.ios-toast--error .ios-toast-indicator {
  background-color: var(--color-red);
}

.ios-toast--warning .ios-toast-indicator {
  background-color: var(--color-orange);
}

.ios-toast--info .ios-toast-indicator {
  background-color: var(--color-blue);
}

/* ---- Message ------------------------------------------------------------ */
.ios-toast-message {
  flex: 1;
  font: var(--type-subheadline);
  color: var(--label-primary);
  word-break: break-word;
}

/* ---- Close button ------------------------------------------------------- */
.ios-toast-close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--label-secondary);
  font-size: var(--text-body);
  line-height: 1;
  cursor: pointer;
  transition: background-color var(--duration-normal), color var(--duration-normal);
}

.ios-toast-close:hover {
  background-color: var(--fill-tertiary);
  color: var(--label-primary);
}

/* ---- Transitions -------------------------------------------------------- */
.ios-toast-enter-active {
  transition: all var(--duration-slow) var(--ease-default);
}

.ios-toast-leave-active {
  transition: all var(--duration-normal) var(--ease-default);
}

.ios-toast-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.ios-toast-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

.ios-toast-move {
  transition: transform var(--duration-slow) var(--ease-default);
}
</style>
