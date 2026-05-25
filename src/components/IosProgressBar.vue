<template>
  <div
    class="ios-progress-bar"
    :class="{ 'ios-progress-bar--fixed': fixed }"
    :style="{ '--ios-progress-height': barHeight, '--ios-progress-color': color, '--ios-progress-glow': glow, '--ios-progress-z-index': zIndex }"
  >
    <div class="ios-progress-bar-track">
      <div
        class="ios-progress-bar-fill"
        :style="{ transform: 'scaleX(' + clampedProgress / 100 + ')' }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * IosProgressBar — A thin horizontal reading progress indicator.
 *
 * Renders a fixed-position bar at the very top of the viewport that fills
 * from left to right based on the `progress` value. Designed for use as a
 * scroll-progress indicator on article/post pages.
 *
 * @prop {number}  [progress=0]  Percentage filled, 0–100.
 * @prop {number|string} [height='3px']  Thickness of the fill bar.
 * @prop {string}  [color='var(--color-blue)']  Fill background color.
 * @prop {string}  [glow='var(--color-blue)']   Glow box-shadow color.
 * @prop {boolean} [fixed=true]   Use `position: fixed` (top of viewport).
 * @prop {number}  [z-index=1000] Z-index when `fixed` is true.
 */
const props = defineProps({
  progress: { type: Number, default: 0 },
  height: { type: [Number, String], default: '3px' },
  color: { type: String, default: 'var(--color-blue)' },
  glow: { type: String, default: 'var(--color-blue)' },
  fixed: { type: Boolean, default: true },
  zIndex: { type: Number, default: 1000 },
})

const clampedProgress = computed(() =>
  Math.min(100, Math.max(0, Number(props.progress)))
)

const barHeight = computed(() =>
  typeof props.height === 'number' ? props.height + 'px' : props.height
)
</script>

<style scoped>
.ios-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--ios-progress-z-index);
  pointer-events: none;
}

.ios-progress-bar--fixed {
  position: fixed;
}

.ios-progress-bar-track {
  width: 100%;
  height: var(--ios-progress-height);
  background: transparent;
  overflow: hidden;
}

.ios-progress-bar-fill {
  width: 100%;
  height: 100%;
  transform-origin: left;
  will-change: transform;
  transition: transform 0.1s linear;
  background: var(--ios-progress-color);
  box-shadow: 0 0 6px var(--ios-progress-glow);
}
</style>
