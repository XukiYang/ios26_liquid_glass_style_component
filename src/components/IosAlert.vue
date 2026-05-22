<template>
  <Teleport to="body">
    <div v-if="modelValue" class="alert-backdrop" @click="close">
      <div class="alert material-thick" role="alertdialog" :aria-label="title" @click.stop>
        <div class="alert-content">
          <h2 class="text-headline">{{ title }}</h2>
          <p v-if="message" class="text-callout text-secondary">{{ message }}</p>
        </div>
        <div class="alert-actions">
          <button
            v-for="action in actions"
            :key="action.label"
            class="alert-action text-body"
            :class="{ cancel: action.style === 'cancel', destructive: action.style === 'destructive' }"
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
