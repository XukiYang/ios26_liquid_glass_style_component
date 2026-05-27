import { onUnmounted } from 'vue'
import { gsap } from 'gsap'

/**
 * Shared motion presets — maps to tokens.css motion tokens.
 * GSAP uses seconds (not CSS strings), so these are numeric.
 */
const DURATION = { fast: 0.15, normal: 0.25, slow: 0.35 }

/**
 * iOS-style spring ease.
 * Config: gentle overshoot, quick settle.
 */
const SPRING = { ease: 'elastic.out(1, 0.75)' }

/**
 * Compact spring for small UI elements (toggle, segmented control).
 * Less overshoot, snappier.
 */
const SPRING_TIGHT = { ease: 'elastic.out(1, 0.85)' }

/**
 * useGsap — composable that provides a scoped gsap instance.
 *
 * Returns a tracked `tween()` helper that auto-kills tweens on unmount.
 * Respects prefers-reduced-motion: duration becomes 0 (instant).
 *
 * @returns {{ tween: Function, reducedMotion: boolean, gsap: object, matchMedia: Function }}
 */
export function useGsap() {
  const active = new Set()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onUnmounted(() => {
    active.forEach((t) => t.kill())
    active.clear()
  })

  /**
   * Create a tracked tween. Identical API to gsap.to() but auto-cleans up.
   *
   * @param {Element|object} target
   * @param {object} vars - GSAP vars (duration, ease, y, x, scale, etc.)
   * @returns {gsap.core.Tween}
   */
  function tween(target, vars) {
    if (reducedMotion) {
      const instant = { ...vars, duration: 0 }
      return gsap.to(target, instant)
    }
    const t = gsap.to(target, vars)
    active.add(t)
    t.eventCallback('onComplete', () => active.delete(t))
    t.eventCallback('onKill', () => active.delete(t))
    return t
  }

  return { tween, reducedMotion, gsap, matchMedia: gsap.matchMedia.bind(gsap), DURATION, SPRING, SPRING_TIGHT }
}
