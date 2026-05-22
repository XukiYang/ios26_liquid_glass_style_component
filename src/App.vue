<template>
  <!-- Background gradient orbs -->
  <div class="bg-layer">
    <div class="orb orb-1" />
    <div class="orb orb-2" />
    <div class="orb orb-3" />
    <div class="orb orb-4" />
    <div class="orb orb-5" />
  </div>

  <!-- App Shell -->
  <div class="app-shell">
    <!-- Status Bar -->
    <header class="status-bar liquid-glass-large">
      <div class="toolbar-leading">
        <IosButton variant="plain" size="small" @click="toggleTheme">
          {{ isDark ? '☀︎ Light' : '☾ Dark' }}
        </IosButton>
      </div>
      <div class="toolbar-title text-headline emphasized">iOS 26 — Liquid Glass</div>
      <div class="toolbar-trailing" />
    </header>

    <main class="scroll-area" @scroll="onScroll" ref="scrollRef">

      <!-- Hero -->
      <section class="hero">
        <div class="hero-glass liquid-glass-large">
          <span class="hero-icon"></span>
          <h1 class="text-large-title emphasized">iOS 26</h1>
          <p class="text-title3 text-secondary">Design System Preview</p>
        </div>
      </section>

      <!-- Section: Glass Materials -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">Materials</h2>
        <div class="materials-row">
          <div v-for="m in materials" :key="m.label" :class="['material-chip', m.class]">
            <span class="text-caption1">{{ m.label }}</span>
          </div>
        </div>
      </section>

      <!-- Section: System Colors -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">System Colors</h2>
        <div class="color-grid">
          <div v-for="c in systemColors" :key="c.name" class="color-chip liquid-glass-small">
            <div class="color-swatch" :style="{ background: c.css }" />
            <span class="text-caption2">{{ c.name }}</span>
          </div>
        </div>
      </section>

      <!-- Section: Typography -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">Typography</h2>
        <div class="glass-card liquid-glass-medium">
          <div v-for="t in typeStyles" :key="t.name" class="type-row">
            <span :class="['type-sample', t.class]">{{ t.label }}</span>
            <span class="text-caption2 text-tertiary type-meta">{{ t.name }} · {{ t.size }}</span>
          </div>
        </div>
      </section>

      <!-- Section: Buttons -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">Buttons</h2>
        <div class="glass-card liquid-glass-medium">
          <div class="btn-grid">
            <div v-for="v in buttonVariants" :key="v" class="btn-cell">
              <IosButton :variant="v" size="medium">{{ v }}</IosButton>
              <span class="text-caption2 text-tertiary">{{ v }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Controls -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">Controls</h2>
        <div class="glass-card liquid-glass-medium">
          <IosSegmentedControl :segments="['Day', 'Week', 'Month', 'Year']" v-model="segIndex" />
          <div style="height:16px" />

          <IosToggle v-model="toggle1" label="Airplane Mode" />
          <div class="separator" />
          <IosToggle v-model="toggle2" label="Wi-Fi" />
          <div class="separator" />
          <IosToggle v-model="toggle3" label="Bluetooth" />

          <div style="height:16px" />
          <IosSlider v-model="sliderVal" :min="0" :max="100">
            <template #leading><span class="text-caption1">Vol</span></template>
            <template #trailing><span class="text-caption1 text-secondary">{{ sliderVal }}%</span></template>
          </IosSlider>
        </div>
      </section>

      <!-- Section: Liquid Glass Bar (animated capsule) -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">Liquid Glass Bar</h2>
        <div class="glass-card liquid-glass-medium" style="display:flex;flex-direction:column;gap:12px;">
          <IosLiquidGlassBar v-model="glassBar1" :options="['For You', 'Browse', 'Radio', 'Library']" />
          <IosLiquidGlassBar v-model="glassBar2" :options="['Day', 'Week', 'Month']" />
          <IosLiquidGlassBar v-model="glassBar3" :options="['Music', 'Podcasts']" />
          <div class="text-caption1 text-secondary" style="text-align:center;">
            Click an option — the glass pill slides with animated distortion
          </div>
        </div>
      </section>

      <!-- Section: Inputs -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">Inputs</h2>
        <div class="glass-card liquid-glass-medium">
          <IosTextField v-model="textVal" label="Name" placeholder="Enter your name" clearable />
          <div style="height:12px" />
          <IosSearchBar v-model="searchVal" placeholder="Search..." />
        </div>
      </section>

      <!-- Section: List -->
      <section class="section">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">List</h2>
        <IosListSection header="Settings">
          <IosListRow disclosure>
            <template #leading><span class="row-icon">✈️</span></template>
            Airplane Mode
            <template #trailing>Off</template>
          </IosListRow>
          <IosListRow disclosure separator>
            <template #leading><span class="row-icon">📶</span></template>
            Wi-Fi
            <template #trailing>Home_5G</template>
          </IosListRow>
          <IosListRow disclosure separator>
            <template #leading><span class="row-icon">🔵</span></template>
            Bluetooth
            <template #trailing>On</template>
          </IosListRow>
          <IosListRow disclosure>
            <template #leading><span class="row-icon">📱</span></template>
            Cellular
          </IosListRow>
        </IosListSection>
      </section>

      <!-- Section: Overlays -->
      <section class="section" style="padding-bottom: 100px;">
        <h2 class="section-label text-footnote emphasized text-secondary" style="text-transform:uppercase;letter-spacing:0.5px;">Overlays</h2>
        <div class="glass-card liquid-glass-medium" style="display:flex;gap:8px;align-items:center;">
          <IosButton variant="filled" @click="alertOpen = true">Alert</IosButton>
          <IosButton variant="liquid-glass" @click="sheetOpen = true">Sheet</IosButton>
        </div>
      </section>

      <div class="bottom-spacer" />
    </main>

    <!-- Bottom Tab Bar -->
    <nav class="tabbar-custom liquid-glass-large">
      <button v-for="t in tabItems" :key="t.id"
        class="tab-item-custom"
        :class="{ active: activeTab === t.id }"
        @click="activeTab = t.id">
        <span class="tab-icon">{{ t.icon }}</span>
        <span class="text-caption2">{{ t.label }}</span>
      </button>
    </nav>
  </div>

  <!-- Overlays -->
  <IosAlert v-model="alertOpen" title="Face ID & Passcode"
    message="Enter your passcode to access this feature."
    :actions="alertActions" />

  <IosSheet v-model="sheetOpen" title="Actions" detent="medium">
    <IosListSection>
      <IosListRow v-for="i in 6" :key="i" disclosure separator>
        Option {{ i }}
      </IosListRow>
    </IosListSection>
  </IosSheet>

  <!-- Draggable Liquid Glass Lens — mounted to body -->
  <LiquidGlassEffect />
</template>

<script setup>
import { ref } from 'vue'
import IosButton from './components/IosButton.vue'
import IosSegmentedControl from './components/IosSegmentedControl.vue'
import IosToggle from './components/IosToggle.vue'
import IosSlider from './components/IosSlider.vue'
import IosTextField from './components/IosTextField.vue'
import IosSearchBar from './components/IosSearchBar.vue'
import IosListRow from './components/IosListRow.vue'
import IosListSection from './components/IosListSection.vue'
import IosAlert from './components/IosAlert.vue'
import IosSheet from './components/IosSheet.vue'
import IosLiquidGlassBar from './components/IosLiquidGlassBar.vue'
import LiquidGlassEffect from './components/LiquidGlassEffect.vue'

const isDark = ref(false)
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

const scrollY = ref(0)
const scrollRef = ref(null)
function onScroll(e) { scrollY.value = e.target.scrollTop }

const materials = [
  { label: 'Chrome', class: 'material-chrome' },
  { label: 'Thick', class: 'material-thick' },
  { label: 'Regular', class: 'material-regular' },
  { label: 'Thin', class: 'material-thin' },
  { label: 'Ultra Thin', class: 'material-ultrathin' },
  { label: 'Glass Lg', class: 'liquid-glass-large' },
  { label: 'Glass Md', class: 'liquid-glass-medium' },
  { label: 'Glass Sm', class: 'liquid-glass-small' },
]

const systemColors = [
  { name: 'Red', css: 'var(--color-red)' },
  { name: 'Orange', css: 'var(--color-orange)' },
  { name: 'Yellow', css: 'var(--color-yellow)' },
  { name: 'Green', css: 'var(--color-green)' },
  { name: 'Mint', css: 'var(--color-mint)' },
  { name: 'Teal', css: 'var(--color-teal)' },
  { name: 'Cyan', css: 'var(--color-cyan)' },
  { name: 'Blue', css: 'var(--color-blue)' },
  { name: 'Indigo', css: 'var(--color-indigo)' },
  { name: 'Purple', css: 'var(--color-purple)' },
  { name: 'Pink', css: 'var(--color-pink)' },
  { name: 'Brown', css: 'var(--color-brown)' },
]

const typeStyles = [
  { name: 'Large Title', class: 'text-large-title', label: 'Large Title', size: '34px' },
  { name: 'Title 1', class: 'text-title1', label: 'Title 1', size: '28px' },
  { name: 'Title 2', class: 'text-title2', label: 'Title 2', size: '22px' },
  { name: 'Title 3', class: 'text-title3', label: 'Title 3', size: '20px' },
  { name: 'Headline', class: 'text-headline', label: 'Headline', size: '17px · Semibold' },
  { name: 'Body', class: 'text-body', label: 'Body', size: '17px' },
  { name: 'Callout', class: 'text-callout', label: 'Callout', size: '16px' },
  { name: 'Subheadline', class: 'text-subheadline', label: 'Subheadline', size: '15px' },
  { name: 'Footnote', class: 'text-footnote', label: 'Footnote', size: '13px' },
  { name: 'Caption 1', class: 'text-caption1', label: 'Caption 1', size: '12px' },
  { name: 'Caption 2', class: 'text-caption2', label: 'Caption 2', size: '11px' },
]

const buttonVariants = ['filled', 'gray', 'tinted', 'plain', 'liquid-glass']

const segIndex = ref(0)
const glassBar1 = ref(0)
const glassBar2 = ref(1)
const glassBar3 = ref(0)
const toggle1 = ref(true)
const toggle2 = ref(false)
const toggle3 = ref(true)
const sliderVal = ref(65)
const textVal = ref('')
const searchVal = ref('')
const alertOpen = ref(false)
const sheetOpen = ref(false)

const alertActions = [
  { label: 'Cancel', style: 'cancel', onclick: () => {} },
  { label: 'Enter Passcode', style: 'default', onclick: () => {} },
]

const tabItems = [
  { id: 'home', label: 'Preview', icon: '􀎞' },
  { id: 'tokens', label: 'Tokens', icon: '􀈂' },
  { id: 'components', label: 'Components', icon: '􀁷' },
  { id: 'settings', label: 'Settings', icon: '􀍟' },
]
const activeTab = ref('home')
</script>

<style>
/* ===== Reset ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-family);
  background: var(--bg-primary);
  color: var(--label-primary);
  overflow: hidden;
  height: 100vh;
}

#app {
  height: 100vh;
  overflow: hidden;
}

/* ===== Background Orbs (rich gradient for liquid glass to distort) ===== */
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
}
.orb-1 {
  width: 320px; height: 320px;
  background: linear-gradient(135deg, #ff2d55, #ff8d28);
  top: -80px; left: -60px;
  animation: orb-drift 8s ease-in-out infinite;
}
.orb-2 {
  width: 260px; height: 260px;
  background: linear-gradient(135deg, #0088ff, #00c8b3);
  top: 35%; right: -80px;
  animation: orb-drift 10s ease-in-out infinite reverse;
}
.orb-3 {
  width: 220px; height: 220px;
  background: linear-gradient(135deg, #cb30e0, #6155f5);
  bottom: 5%; left: 25%;
  animation: orb-drift 9s ease-in-out infinite 2s;
}
.orb-4 {
  width: 180px; height: 180px;
  background: linear-gradient(135deg, #34c759, #00c8b3);
  top: 20%; left: 40%;
  animation: orb-drift 11s ease-in-out infinite 1s;
}
.orb-5 {
  width: 240px; height: 240px;
  background: linear-gradient(135deg, #ffcc00, #ff8d28);
  bottom: 25%; right: 20%;
  animation: orb-drift 7s ease-in-out infinite 3s;
}

@keyframes orb-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(15px, -20px) scale(1.08); }
  50% { transform: translate(-10px, 15px) scale(0.94); }
  75% { transform: translate(-18px, -8px) scale(1.04); }
}

/* ===== App Shell ===== */
.app-shell {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* ===== Status Bar / Toolbar ===== */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 16px;
  flex-shrink: 0;
  z-index: 50;
}
.toolbar-leading, .toolbar-trailing { display: flex; gap: 8px; min-width: 70px; }
.toolbar-trailing { justify-content: flex-end; }
.toolbar-title { flex: 1; text-align: center; }

/* ===== Scroll Area ===== */
.scroll-area {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 0 20px;
}

/* ===== Hero ===== */
.hero {
  padding: 24px 16px 16px;
  text-align: center;
}
.hero-glass {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 32px 48px;
  border-radius: 28px;
}
.hero-icon {
  font-size: 40px;
  margin-bottom: 4px;
}

/* ===== Sections ===== */
.section { padding: 0 12px 12px; }
.section-label { padding: 0 8px 8px; }

/* ===== Materials Row ===== */
.materials-row {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 0 4px 8px;
  scrollbar-width: none;
}
.materials-row::-webkit-scrollbar { display: none; }
.material-chip {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 10px;
  min-width: 72px;
  min-height: 44px;
}

/* ===== Color Grid ===== */
.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}
.color-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: 10px;
}
.color-swatch {
  width: 32px; height: 32px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.08);
}

/* ===== Glass Card ===== */
.glass-card {
  padding: 14px;
  border-radius: 16px;
}

/* ===== Typography Rows ===== */
.type-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 0.5px solid var(--separator);
}
.type-row:last-child { border-bottom: none; }
.type-meta { min-width: 80px; text-align: right; }

/* ===== Button Grid ===== */
.btn-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.btn-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

/* ===== Separator (inner-card) ===== */
.separator { height: 0.5px; background: var(--separator); margin: 0; }

/* ===== Row Icon ===== */
.row-icon { font-size: 20px; }

/* ===== Tab Bar Custom ===== */
.tabbar-custom {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 6px 0 8px;
  flex-shrink: 0;
  z-index: 50;
  margin: 0 8px 8px;
  border-radius: 20px;
}
.tab-item-custom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  color: var(--label-secondary);
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 10px;
  transition: color 0.2s;
  font-family: var(--font-family);
  -webkit-tap-highlight-color: transparent;
}
.tab-item-custom.active { color: var(--color-blue); }
.tab-icon { font-size: 22px; line-height: 1; }

.bottom-spacer { height: 60px; }
</style>
