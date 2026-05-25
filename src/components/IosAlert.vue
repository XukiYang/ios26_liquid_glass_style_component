<template>
  <Teleport to="body">
    <div v-if="modelValue" class="ios-alert-backdrop" @click="close">
      <div class="ios-alert" role="alertdialog" :aria-label="title" @click.stop>
        <div class="ios-alert-content">
          <h2>{{ title }}</h2>
          <p v-if="message">{{ message }}</p>
        </div>
        <div class="ios-alert-actions">
          <button
            v-for="action in actions"
            :key="action.label"
            class="ios-alert-action"
            :class="{ 'ios-alert-action-cancel': action.style === 'cancel', 'ios-alert-action-destructive': action.style === 'destructive' }"
            @click="onAction(action)"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: { type: String, required: true },
  message: String,
  actions: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

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
}
.ios-alert {
  width: 270px;
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  text-align: center;
  background: var(--glass-large-bg);
  backdrop-filter: blur(var(--blur-regular));
  -webkit-backdrop-filter: blur(var(--blur-regular));
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
  font-family: var(--font-family);
  font-size: var(--text-headline);
  line-height: var(--lh-headline);
  letter-spacing: var(--ls-headline);
  font-weight: var(--weight-semibold);
}
p {
  font-family: var(--font-family);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-body);
  color: var(--label-secondary);
}
.ios-alert-action {
  font-family: var(--font-family);
  font-size: var(--text-callout);
  line-height: var(--lh-callout);
  letter-spacing: var(--ls-callout);
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-blue);
  color: var(--white);
  font-weight: var(--weight-semibold);
}
.ios-alert-action.ios-alert-action-cancel { background: var(--fill-primary); color: var(--color-blue); }
.ios-alert-action.ios-alert-action-destructive { background: var(--color-red); color: var(--white); }
</style>
