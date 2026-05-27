<template>
  <div class="ios-empty-state">
    <!-- Icon area -->
    <div class="ios-empty-state-icon">
      <slot name="icon">
        <IosIcon v-if="icon" :name="icon" size="48" />
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
        <IosButton
          v-if="actionText"
          variant="plain"
          size="small"
          @click="$emit('action')"
        >
          {{ actionText }}
        </IosButton>
      </slot>
    </div>
  </div>
</template>

<script setup>
import IosIcon from './IosIcon.vue'
import IosButton from './IosButton.vue'

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

.ios-empty-state-content {
  margin-bottom: var(--space-5);
}

.ios-empty-state-title {
  font: var(--type-title2);
  color: var(--label-primary);
  margin: 0;
}

.ios-empty-state-description {
  font: var(--type-subheadline);
  color: var(--label-secondary);
  margin: var(--space-2) 0 0;
}

.ios-empty-state-action {
  margin-top: var(--space-2);
}
</style>
