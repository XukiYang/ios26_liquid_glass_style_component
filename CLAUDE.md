# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start Vite dev server with HMR (http://localhost:XXXX)
npm run build   # Production build
npm run preview # Preview production build
```

## Commit Conventions

- 使用中文编写提交信息
- 使用祈使句、现在时（"添加X功能"，而非"添加了X功能"）
- 标题控制在 70 字符以内
- 描述侧重说明*为什么*这么做，而不是*做了什么*（diff 已展示做了什么）
- 不使用 emoji

## Architecture

### Project structure

```
src/
  main.js                        — App entry (imports tokens.css, base.css, font.css)
  App.vue                        — Preview shell demo page (demo-only styles)
  assets/styles/
    tokens.css                   — Design tokens (colors, spacing, typography, motion, shadows) — mandatory global CSS
    base.css                     — CSS reset, typography utilities, glass effects — mandatory global CSS
  components/
    IosXxx*.vue                  — Each component fully self-contained with <style scoped>
  composables/
    useToast.js                  — Toast notification composable (singleton, shared state)
    useConfirm.js                — Promise-based confirm dialog composable (pairs with IosAlert)
    useTheme.js                  — Dark/light theme toggle composable
    useDrag.js                   — Pointer drag gesture composable
  assets/font/
    font.css                     — HarmonyOS Sans SC font-face declarations
    HarmonyOS_Sans/              — HarmonyOS TTF font files
```

### Components

| Component | Description |
|-----------|-------------|
| `IosButton` | Filled/gray/tinted/plain/liquid-glass button variants |
| `IosSegmentedControl` | Segmented control with equal-width segments, v-model |
| `IosCapsuleGroup` | Pill-shaped capsule button group, animated pill indicator |
| `IosChip` | Pill-shaped filter/tag chip, active/hover/disabled states |
| `IosToggle` | Toggle switch with v-model |
| `IosSlider` | Horizontal slider with leading/trailing slots |
| `IosTextField` | Text input with label, icon, clearable |
| `IosSearchBar` | Search input field |
| `IosIcon` | SVG icon system, 15+ built-in icons |
| `IosProgressBar` | Horizontal progress bar, fixed position, accent glow |
| `IosToast` | Toast notification with types, auto-dismiss, slide animation |
| `IosErrorView` | Error boundary display, retry/home buttons |
| `IosEmptyState` | Centered empty state placeholder with icon/title/description/action |
| `IosFloatingActionButton` | Draggable FAB with expand/collapse action panel |
| `IosActionBar` | Vertical card button group (icon + label rows) |
| `IosListRow` | List row with leading/trailing slots, disclosure, separator |
| `IosListSection` | Grouped list section wrapper |
| `IosTableView` | Inset grouped list with sections, header/footer, disclosure indicators |
| `IosPagination` | Page navigation with page numbers and ellipsis |
| `IosAlert` | Modal alert dialog, action buttons |
| `IosSheet` | Bottom sheet with detents |
| `IosTabBar` | Bottom tab bar |
| `IosToolbar` | Top toolbar with collapse support |
| `IosTagInput` | Text input with autocomplete dropdown |
| `IosVerticalNav` | Vertical sidebar navigation |
| `IosChart` | Chart.js wrapper, line/bar/pie/doughnut/radar/area, iOS theme auto-applied |

### Design decisions

| Topic | Decision |
|---|---|
| **Audience** | Vue 3 developers |
| **Distribution** | Source-copy (no npm publish) |
| **Component encapsulation** | Fully self-contained `<style scoped>` |
| **External deps** | `chart.js` + `vue-chartjs` (IosChart only) |
| **Mandatory global dep** | `tokens.css` (design tokens) + `base.css` (reset + utilities) |
| **CSS naming** | `ios-` prefix for all custom classes (e.g. `ios-btn`, `ios-capsule-track`) |
| **Dark mode** | All values in `tokens.css` CSS variables; components only reference `var(--*)` |
| **Typography** | `var(--type-headline)` shorthand in scoped CSS; `.text-*` utilities in `base.css` for demo only |
| **Motion** | `var(--duration-fast/normal/slow)` + `var(--ease-default/spring)` tokens; no hardcoded durations |
| **Shadows** | `var(--shadow-sm/md/lg/pill/thumb)` tokens; no hardcoded shadow values |
| **Focus ring** | `var(--focus-ring)` token for input focus states |
| **Composables** | Unified `useXxx()` factory function pattern |
| **Documentation** | JSDoc on `defineProps`/`defineEmits` for IDE hints; App.vue is a visual demo only |

### IosCapsuleGroup specifics

- Track: full capsule, 36px height, `background: var(--fill-tertiary)`
- Pill: absolutely positioned, white background with shadow, transition on transform/width
- Slide animation: CSS transition `var(--ease-spring)`, `var(--duration-slow)`
- ResizeObserver for responsive pill repositioning on container resize
- v-model compatible (`update:modelValue` + `change` events)
- Accepts: string array or `{id, label}[]`
- CSS class prefix: `ios-capsule-` (track, pill, option, label)
