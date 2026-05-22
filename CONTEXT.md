# iOS 26 Design System — Context

## Audience

Vue 3 developers building iOS 26-style web applications.

## Scope

A Vue 3 component library + design token system that reproduces the iOS 26 visual language (materials, typography, controls, layouts) for web targets.

## Distribution

Source-copy — consumers clone/copy the relevant files directly. No npm publish pipeline.

## Components

Covered: Button, Toggle, Slider, TextField, SearchBar, SegmentedControl, TabBar, Toolbar, ListRow/ListSection, Alert, Sheet, LiquidGlassBar.
Grown on demand — no preset roadmap.

### Encapsulation

Fully self-contained. Each `.vue` carries its own `<style scoped>` with zero external CSS file dependencies. The only mandatory global dependency is `tokens.css` (design tokens).

### Naming Convention

CSS classes use the `ios-` prefix for all custom classes (e.g., `ios-btn`, `ios-lgb-track`, `ios-toggle`). This namespaces the library away from consumer projects.

## Documentation

Props/emits documented via JSDoc inline comments in `defineProps`/`defineEmits` — shows in IDE hover hints, zero extra tooling. `App.vue` serves as a lightweight demo page (visual preview only), not as documentation.

### Dark Mode

All dark/light values live in `tokens.css` under `:root` (light defaults) and `@media (prefers-color-scheme: dark) + [data-theme="dark"]` overrides. Component `<style scoped>` references CSS variables only — zero dark-mode media queries or attribute selectors in component styles.

## Typography

`typography.css` merged into `tokens.css` as variables. Components reference font size/weight/letter-spacing via `var(--text-subheadline)`, `var(--weight-medium)` etc. in scoped CSS. No `.text-*` utility classes used.

## Composables

Unified `useXxx()` factory function pattern per Vue 3 conventions. Each call creates an independent instance with its own lifecycle (mount/destroy).

