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
  main.js                        — App entry
  App.vue                        — Preview shell demo page
  assets/styles/
    tokens.css                   — Design tokens (colors, spacing, typography) — the ONLY mandatory global CSS
  components/
    IosXxx*.vue                  — Each component fully self-contained with <style scoped>
  composables/
    useToast.js                  — Toast notification composable (singleton, shared state)
    useConfirm.js                — Promise-based confirm dialog composable (pairs with IosAlert)
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

### IosCapsuleGroup specifics

- Track: full capsule, 40px height, `background: var(--gray-4)`, subtle shadow
- Pill: absolutely positioned, 36px tall, white background with shadow, transition on transform/width
- Slide animation: CSS transition `cubic-bezier(0.25, 0.1, 0.25, 1)`, 0.3s
- ResizeObserver for responsive pill repositioning on container resize
- v-model compatible (`update:modelValue` + `change` events)
- Accepts: string array or `{id, label}[]`
