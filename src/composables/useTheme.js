import { ref } from 'vue'

/**
 * useTheme — Theme (dark/light) toggle composable.
 *
 * Reads initial theme from localStorage or data-theme attribute,
 * and persists changes to both.
 *
 * @returns {{
 *   isDark: import('vue').Ref<boolean>,
 *   toggleTheme: () => void,
 * }}
 */
export function useTheme() {
  function getInitialDark() {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') return true
    if (stored === 'light') return false
    return document.documentElement.getAttribute('data-theme') === 'dark'
  }

  const isDark = ref(getInitialDark())

  function toggleTheme() {
    isDark.value = !isDark.value
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  return { isDark, toggleTheme }
}
