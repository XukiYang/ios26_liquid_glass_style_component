<template>
  <Teleport to="body">
    <div v-if="visible" ref="backdropRef" class="ios-alert-backdrop" @click="close">
      <div ref="alertRef" class="ios-alert" role="alertdialog" :aria-label="title" @click.stop>
        <div class="ios-alert-content">
          <h2>{{ title }}</h2>
          <p v-if="message">{{ message }}</p>
        </div>
        <div class="ios-alert-actions">
          <IosButton
            v-for="action in actions"
            :key="action.label"
            :variant="action.style === 'cancel' ? 'gray' : action.style === 'destructive' ? 'destructive' : 'filled'"
            size="small"
            @click="onAction(action)"
          >
            {{ action.label }}
          </IosButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import IosButton from './IosButton.vue'
import { useGsap } from '../composables/useGsap.js'

/**
 * IosAlert — Modal alert dialog with action buttons.
 *
 * @prop {boolean} [modelValue=false] - Visibility state (v-model)
 * @prop {string} title - Alert title (required)
 * @prop {string} [message] - Alert body message
 * @prop {Array<{label: string, style?: 'default'|'cancel'|'destructive', onclick?: Function}>} [actions=[]] - Action buttons
 *
 * @event {'update:modelValue'} update:modelValue - Emitted on close (v-model)
 */
const props = defineProps({
  modelValue: Boolean,
  title: { type: String, required: true },
  message: String,
  actions: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const { tween, reducedMotion, SPRING, DURATION } = useGsap()
const visible = ref(false)
const backdropRef = ref(null)
const alertRef = ref(null)

watch(() => props.modelValue, (show) => {
  if (show) {
    visible.value = true
    requestAnimationFrame(() => {
      if (!backdropRef.value || !alertRef.value) return
      tween(backdropRef.value, { opacity: 1, duration: DURATION.normal, ease: 'power2.out' })
      tween(alertRef.value, {
        scale: 1, opacity: 1,
        duration: reducedMotion ? 0 : 0.4,
        ease: SPRING.ease,
      })
    })
  } else if (visible.value) {
    tween(backdropRef.value, { opacity: 0, duration: DURATION.normal, ease: 'power2.in' })
    tween(alertRef.value, {
      scale: 0.9, opacity: 0,
      duration: DURATION.normal,
      ease: 'power2.in',
      onComplete: () => { visible.value = false },
    })
  }
})

function close() {
  emit('update:modelValue', false)
}

function onAction(action) {
  action.onclick?.()
  close()
}
</script>

<style scoped>
.ios-alert-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
}
.ios-alert {
  width: 270px;
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  text-align: center;
  background: var(--glass-large-bg);
  backdrop-filter: blur(var(--blur-regular));
  -webkit-backdrop-filter: blur(var(--blur-regular));
  transform: scale(0.9);
  opacity: 0;
}
.ios-alert-content { margin-bottom: var(--space-4); }
.ios-alert-content h2 { margin: 0 0 var(--space-1); }
.ios-alert-content p { margin: 0; }
.ios-alert-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
h2 {
  font: var(--type-headline);
}
p {
  font: var(--type-body);
  color: var(--label-secondary);
}
</style>
