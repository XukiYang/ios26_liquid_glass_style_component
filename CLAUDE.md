# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start Vite dev server with HMR (http://localhost:XXXX)
npm run build   # Production build
npm run preview # Preview production build
```

## Commit Conventions

- Use imperative, present-tense commit messages ("Add X", not "Added X")
- Keep subject under 70 characters
- Focus the description on *why*, not *what* (the diff shows what)
- No emoji in commit messages

## Architecture

### Project structure

```
src/
  main.js                        — App entry
  App.vue                        — Preview shell demo page
  assets/styles/
    tokens.css                   — Design tokens (colors, spacing, typography, glass vars) — the ONLY mandatory global CSS
    materials.css                — Optional utility classes for glass/material effects (not used by components)
    components.css               — Legacy shared styles (target: delete; migrate into component scoped CSS)
    typography.css               — Legacy (target: merge into tokens.css, delete)
  components/
    IosXxx*.vue                  — Each component fully self-contained with <style scoped>
  composables/
    usePillLiquidGlass.js        — Per-instance canvas SDF + SVG feDisplacementMap filter
    useLiquidGlass.js            — Core liquid glass shader (standalone, not Vue-specific)
    useLiquidGlassFilter.js      — Global turbulence-based filter singleton
```

### Design decisions

| Topic | Decision |
|---|---|
| **Audience** | Vue 3 developers |
| **Distribution** | Source-copy (no npm publish) |
| **Component encapsulation** | Fully self-contained `<style scoped>`, zero external CSS deps |
| **Mandatory global dep** | Only `tokens.css` (design tokens) |
| **CSS naming** | `ios-` prefix for all custom classes (e.g. `ios-btn`, `ios-lgb-track`) |
| **Dark mode** | All values in `tokens.css` CSS variables; components only reference `var(--*)` |
| **Typography** | `var(--text-subheadline)` etc. in scoped CSS; no `.text-*` utility classes |
| **Composables** | Unified `useXxx()` factory function pattern |
| **Documentation** | JSDoc on `defineProps`/`defineEmits` for IDE hints; App.vue is a visual demo only |

### IosLiquidGlassBar specifics

- Track: full capsule, 40px, glass background (`backdrop-filter: blur(40px)`)
- Pill: absolutely positioned, 36px tall, vertically centred (2px top/bottom gap)
- Slide animation: CSS `transition` on `left`/`width`, `cubic-bezier(0.25, 0.1, 0.25, 1)`, 0.35s
- Liquid glass: `usePillLiquidGlass` composable, canvas SDF convex lens + `feDisplacementMap`, filter sized to exact pill px dimensions
- v-model compatible (`update:modelValue` + `change` events)
- Accepts: string array or `{id, label}[]`

### Key pattern — liquid glass displacement

1. Generate displacement map via canvas `ImageData` using SDF for shape
2. Normalise + encode as RGBA (R=horizontal, G=vertical displacement)
3. Canvas data URL → SVG `<feImage>` → `<feDisplacementMap>` filter
4. Apply `filter: url(#id)` + `backdrop-filter: blur()` + semi-transparent bg
5. Filter sized exactly to element's px dimensions (`userSpaceOnUse`) to keep displacement centre aligned
