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
          <IosIcon :name="isDark ? 'sun-one' : 'moon'" size="16" />
          {{ isDark ? 'Light' : 'Dark' }}
        </IosButton>
      </div>
      <div class="toolbar-title text-headline emphasized">iOS 26 — Vue Components</div>
      <div class="toolbar-trailing" />
    </header>

    <main class="scroll-area" @scroll="onScroll" ref="scrollRef">

      <Transition :name="'tab-slide-' + slideDir" mode="out-in">
        <div :key="'tab-' + activeTab" class="tab-content">

      <!-- ============ Preview Tab: Visual Foundation ============ -->
      <template v-if="activeTab === 'preview'">
        <section class="hero">
          <div class="hero-glass liquid-glass-large">
            <IosIcon name="apple" size="40" />
            <h1 class="text-large-title emphasized">iOS 26</h1>
            <p class="text-title3 text-secondary">Design System Preview</p>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Materials</h2>
          <div class="materials-row">
            <div v-for="m in materials" :key="m.label" :class="['material-chip', m.class]">
              <span class="text-caption1">{{ m.label }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">System Colors</h2>
          <div class="color-grid">
            <div v-for="c in systemColors" :key="c.name" class="color-chip liquid-glass-small">
              <div class="color-swatch" :style="{ background: c.css }" />
              <span class="text-caption2">{{ c.name }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Typography</h2>
          <div class="glass-card liquid-glass-medium">
            <div v-for="t in typeStyles" :key="t.name" class="type-row">
              <span :class="['type-sample', t.class]">{{ t.label }}</span>
              <span class="text-caption2 text-tertiary type-meta">{{ t.name }} · {{ t.size }}</span>
            </div>
          </div>
        </section>

        <section class="section" style="padding-bottom: 100px;">
          <h2 class="section-label text-footnote emphasized text-secondary">Icons</h2>
          <div class="glass-card liquid-glass-medium">
            <div class="icon-grid">
              <div v-for="name in iconNames" :key="name" class="icon-demo">
                <IosIcon :name="name" size="24" />
                <span class="text-caption2 text-secondary">{{ name }}</span>
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- ============ Controls Tab: Interactive Controls ============ -->
      <template v-if="activeTab === 'controls'">
        <section class="section" style="padding-top:8px;">
          <h2 class="section-label text-footnote emphasized text-secondary">Buttons</h2>
          <div class="glass-card liquid-glass-medium">
            <div class="btn-grid">
              <div v-for="v in buttonVariants" :key="v" class="btn-cell">
                <IosButton :variant="v" size="medium">{{ v }}</IosButton>
                <span class="text-caption2 text-tertiary">{{ v }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Chips</h2>
          <div class="glass-card liquid-glass-medium" style="display:flex;flex-wrap:wrap;gap:8px;">
            <IosChip v-for="(chip, i) in chipData" :key="i" :active="activeChip === i" @click="activeChip = i">
              {{ chip.label }}
            </IosChip>
            <IosChip disabled>Disabled</IosChip>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Controls</h2>
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

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Inputs</h2>
          <div class="glass-card liquid-glass-medium">
            <IosTextField v-model="textVal" label="Name" placeholder="Enter your name" leading-icon="user" clearable />
            <div style="height:12px" />
            <IosSearchBar v-model="searchVal" placeholder="Search..." />
          </div>
        </section>

        <section class="section" style="padding-bottom: 100px;">
          <h2 class="section-label text-footnote emphasized text-secondary">Progress Bar</h2>
          <div class="glass-card liquid-glass-medium" style="position:relative;padding-top:24px;">
            <IosProgressBar :progress="scrollProgress" :fixed="false" />
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="text-caption2 text-secondary">Page scroll progress</span>
              <span class="text-caption2 emphasized" style="color:var(--color-blue);">{{ scrollProgress }}%</span>
            </div>
          </div>
        </section>
      </template>

      <!-- ============ Navigation Tab: Navigation & Lists ============ -->
      <template v-if="activeTab === 'navigation'">
        <section class="section" style="padding-top:8px;">
          <h2 class="section-label text-footnote emphasized text-secondary">Capsule Group</h2>
          <div class="glass-card liquid-glass-medium" style="display:flex;flex-direction:column;gap:12px;">
            <IosCapsuleGroup v-model="capsule1" :options="['For You', 'Browse', 'Radio', 'Library']" />
            <IosCapsuleGroup v-model="capsule2" :options="['Day', 'Week', 'Month']" />
            <IosCapsuleGroup v-model="capsule3" :options="['Music', 'Podcasts']" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">List</h2>
          <IosListSection header="Settings">
            <IosListRow disclosure>
              <template #leading><IosIcon name="aviation" size="20" /></template>
              Airplane Mode
              <template #trailing>Off</template>
            </IosListRow>
            <IosListRow disclosure separator>
              <template #leading><IosIcon name="wifi" size="20" /></template>
              Wi-Fi
              <template #trailing>Home_5G</template>
            </IosListRow>
            <IosListRow disclosure separator>
              <template #leading><IosIcon name="bluetooth" size="20" /></template>
              Bluetooth
              <template #trailing>On</template>
            </IosListRow>
            <IosListRow disclosure>
              <template #leading><IosIcon name="iphone" size="20" /></template>
              Cellular
            </IosListRow>
          </IosListSection>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Table View</h2>
          <IosTableView header="Features" :items="tableItems" footer="More features available in iOS 26." @select="onTableSelect" />
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Action Bar</h2>
          <IosActionBar :items="actionItems" @change="onActionSelect" />
        </section>

        <section class="section" style="padding-bottom: 100px;">
          <h2 class="section-label text-footnote emphasized text-secondary">Pagination</h2>
          <div class="glass-card liquid-glass-medium">
            <IosPagination v-model="currentPage" :total="85" :page-size="10" :max-visible="7" />
            <div style="text-align:center;margin-top:8px;">
              <span class="text-caption2 text-secondary">Page {{ currentPage }} of 9</span>
            </div>
          </div>
        </section>
      </template>

      <!-- ============ More Tab: Feedback & Settings ============ -->
      <template v-if="activeTab === 'more'">
        <section class="section" style="padding-top:8px;">
          <h2 class="section-label text-footnote emphasized text-secondary">Overlays</h2>
          <div class="glass-card liquid-glass-medium" style="display:flex;gap:8px;align-items:center;">
            <IosButton variant="filled" @click="alertOpen = true">Alert</IosButton>
            <IosButton variant="liquid-glass" @click="sheetOpen = true">Sheet</IosButton>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Toast</h2>
          <div class="glass-card liquid-glass-medium" style="display:flex;gap:8px;flex-wrap:wrap;">
            <IosButton variant="filled" @click="showToast('success')">Success</IosButton>
            <IosButton variant="tinted" @click="showToast('error')">Error</IosButton>
            <IosButton variant="gray" @click="showToast('warning')">Warning</IosButton>
            <IosButton variant="plain" @click="showToast('info')">Info</IosButton>
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Empty State</h2>
          <div class="glass-card liquid-glass-medium">
            <IosEmptyState icon="hourglass-null" title="No Content" description="Your content will appear here once available." action-text="Refresh" @action="console.log('refresh')" />
          </div>
        </section>

        <section class="section">
          <h2 class="section-label text-footnote emphasized text-secondary">Error View</h2>
          <IosErrorView title="Something Went Wrong" message="The operation couldn't be completed. Please try again." @retry="console.log('retry')" @go-home="console.log('home')" />
        </section>

        <section class="section" style="padding-bottom: 100px;">
          <h2 class="section-label text-footnote emphasized text-secondary">Settings</h2>
          <div class="glass-card liquid-glass-medium">
            <IosListSection>
              <IosListRow>
                <template #leading><IosIcon :name="isDark ? 'moon' : 'sun-one'" size="20" /></template>
                Dark Mode
                <template #trailing>
                  <IosButton variant="plain" size="small" @click="toggleTheme">
                    {{ isDark ? 'Disable' : 'Enable' }}
                  </IosButton>
                </template>
              </IosListRow>
              <IosListRow separator disclosure>
                <template #leading><IosIcon name="editor" size="20" /></template>
                Font
                <template #trailing>HarmonyOS Sans</template>
              </IosListRow>
              <IosListRow disclosure>
                <template #leading><IosIcon name="setting-one" size="20" /></template>
                Accent Color
                <template #trailing>Blue</template>
              </IosListRow>
            </IosListSection>
          </div>
        </section>
      </template>

        </div>
      </Transition>

      <div class="bottom-spacer" />
    </main>

    <!-- Bottom Tab Bar -->
    <nav class="tabbar-custom liquid-glass-large">
      <button v-for="t in tabItems" :key="t.id"
        class="tab-item-custom"
        :class="{ active: activeTab === t.id }"
        @click="switchTab(t.id)">
        <IosIcon :name="t.iconName" size="22" />
        <span class="text-caption2">{{ t.label }}</span>
      </button>
    </nav>
  </div>

  <!-- Global Overlays -->
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

  <IosToast />

  <IosFloatingActionButton v-model:expanded="fabExpanded" position="bottom-right" :offset-x="20" :offset-y="80" :z-index="200">
    <template #actions>
      <div style="display:flex;flex-direction:column;gap:4px;padding:4px;">
        <IosButton variant="plain" size="small" @click="onFabAction('New Document')">New Document</IosButton>
        <IosButton variant="plain" size="small" @click="onFabAction('Import')">Import</IosButton>
      </div>
    </template>
  </IosFloatingActionButton>

</template>

<script setup>
import { ref, computed } from 'vue'
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
import IosCapsuleGroup from './components/IosCapsuleGroup.vue'
import IosChip from './components/IosChip.vue'
import IosProgressBar from './components/IosProgressBar.vue'
import IosPagination from './components/IosPagination.vue'
import IosIcon from './components/IosIcon.vue'
import IosEmptyState from './components/IosEmptyState.vue'
import IosErrorView from './components/IosErrorView.vue'
import IosActionBar from './components/IosActionBar.vue'
import IosFloatingActionButton from './components/IosFloatingActionButton.vue'
import IosToast from './components/IosToast.vue'
import IosTableView from './components/IosTableView.vue'
import { useToast } from './composables/useToast.js'

/* ---- Theme ---------------------------------------------------------------- */
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

/* ---- Scroll --------------------------------------------------------------- */
const scrollY = ref(0)
const scrollRef = ref(null)
function onScroll(e) {
  scrollY.value = e.target.scrollTop
}

const scrollProgress = computed(() => {
  const el = scrollRef.value
  if (!el) return 0
  const maxScroll = el.scrollHeight - el.clientHeight
  return maxScroll > 0 ? Math.round((el.scrollTop / maxScroll) * 100) : 0
})

/* ---- Tab Navigation ------------------------------------------------------ */
const tabItems = [
  { id: 'preview',     label: 'Preview',     iconName: 'home' },
  { id: 'controls',    label: 'Controls',    iconName: 'power' },
  { id: 'navigation',  label: 'Navigation',  iconName: 'planet' },
  { id: 'more',        label: 'More',        iconName: 'application-menu' },
]
const activeTab = ref('preview')
const slideDir = ref('left')
const prevIdx = ref(0)

function switchTab(id) {
  const nextIdx = tabItems.findIndex(t => t.id === id)
  slideDir.value = nextIdx >= prevIdx.value ? 'left' : 'right'
  prevIdx.value = nextIdx
  activeTab.value = id
}

/* ---- Preview data -------------------------------------------------------- */
const materials = [
  { label: 'Chrome', class: 'material-chrome' },
  { label: 'Thick', class: 'material-thick' },
  { label: 'Regular', class: 'material-regular' },
  { label: 'Thin', class: 'material-thin' },
  { label: 'Ultra Thin', class: 'material-ultrathin' },
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

const iconNames = [
  /* Navigation & Actions */
  'home', 'back', 'share', 'up', 'down', 'application-menu',
  'search', 'check', 'close', 'refresh', 'download',
  /* Content & Media */
  'comment', 'comments', 'message-one', 'message-success',
  'message-unread', 'message-emoji', 'music', 'camera',
  'tips-one', 'info', 'attention', 'caution',
  /* Objects */
  'plus', 'minus', 'delete', 'pencil', 'editor', 'copy',
  'power', 'logout', 'inspection', 'setting-one', 'lock', 'unlock',
  'time', 'hourglass-null',
  /* Devices & Network */
  'iphone', 'apple', 'devices', 'aviation', 'wifi', 'close-wifi',
  'bluetooth', 'turn-off-bluetooth',
  /* People & Social */
  'user', 'like', 'planet',
  /* Utilities */
  'map-draw', 'adobe-photoshop',
  /* Theme */
  'sun-one', 'moon',
]

/* ---- Controls data ------------------------------------------------------- */
const buttonVariants = ['filled', 'gray', 'tinted', 'plain', 'liquid-glass']

const chipData = [
  { label: 'Swift' },
  { label: 'UIKit' },
  { label: 'SwiftUI' },
  { label: 'Metal' },
  { label: 'ARKit' },
]
const activeChip = ref(0)

const segIndex = ref(0)
const toggle1 = ref(true)
const toggle2 = ref(false)
const toggle3 = ref(true)
const sliderVal = ref(65)
const textVal = ref('')
const searchVal = ref('')

/* ---- Navigation data ----------------------------------------------------- */
const capsule1 = ref(0)
const capsule2 = ref(1)
const capsule3 = ref(0)

const tableItems = [
  { id: 'airdrop', label: 'AirDrop', iconName: 'aviation' },
  { id: 'shareplay', label: 'SharePlay', iconName: 'share' },
  { id: 'standby', label: 'StandBy', iconName: 'hourglass-null' },
  { id: 'vpn', label: 'VPN & Device Management', subtitle: 'Not Connected', iconName: 'lock' },
]
function onTableSelect(id) {
  console.log('Table item selected:', id)
}

const actionItems = [
  { id: 'edit', iconName: 'pencil', label: 'Edit' },
  { id: 'duplicate', iconName: 'copy', label: 'Duplicate' },
  { id: 'share', iconName: 'share', label: 'Share' },
  { id: 'delete', iconName: 'delete', label: 'Delete' },
]
function onActionSelect(id) {
  console.log('Action selected:', id)
}

const currentPage = ref(1)

/* ---- More tab data ------------------------------------------------------- */
const alertOpen = ref(false)
const sheetOpen = ref(false)

const alertActions = [
  { label: 'Cancel', style: 'cancel', onclick: () => {} },
  { label: 'Enter Passcode', style: 'default', onclick: () => {} },
]

const { addToast } = useToast()
function showToast(type) {
  const messages = {
    success: 'Operation completed successfully.',
    error: 'An error occurred. Please try again.',
    warning: 'This action cannot be undone.',
    info: 'Here is some useful information.',
  }
  addToast(messages[type] || 'Toast notification', type, 3000)
}

const fabExpanded = ref(false)
function onFabAction(label) {
  fabExpanded.value = false
  addToast(`${label} action triggered`, 'info')
}
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

/* ===== Typography ===== */
.text-large-title { font-family: var(--font-family); font-size: var(--text-large-title); line-height: var(--lh-large-title); letter-spacing: var(--ls-large-title); font-weight: var(--weight-regular); }
.text-title1 { font-family: var(--font-family); font-size: var(--text-title1); line-height: var(--lh-title1); letter-spacing: var(--ls-title1); font-weight: var(--weight-regular); }
.text-title2 { font-family: var(--font-family); font-size: var(--text-title2); line-height: var(--lh-title2); letter-spacing: var(--ls-title2); font-weight: var(--weight-regular); }
.text-title3 { font-family: var(--font-family); font-size: var(--text-title3); line-height: var(--lh-title3); letter-spacing: var(--ls-title3); font-weight: var(--weight-regular); }
.text-headline { font-family: var(--font-family); font-size: var(--text-headline); line-height: var(--lh-headline); letter-spacing: var(--ls-headline); font-weight: var(--weight-semibold); }
.text-body { font-family: var(--font-family); font-size: var(--text-body); line-height: var(--lh-body); letter-spacing: var(--ls-body); font-weight: var(--weight-regular); }
.text-callout { font-family: var(--font-family); font-size: var(--text-callout); line-height: var(--lh-callout); letter-spacing: var(--ls-callout); font-weight: var(--weight-regular); }
.text-subheadline { font-family: var(--font-family); font-size: var(--text-subheadline); line-height: var(--lh-subheadline); letter-spacing: var(--ls-subheadline); font-weight: var(--weight-regular); }
.text-footnote { font-family: var(--font-family); font-size: var(--text-footnote); line-height: var(--lh-footnote); letter-spacing: var(--ls-footnote); font-weight: var(--weight-regular); }
.text-caption1 { font-family: var(--font-family); font-size: var(--text-caption1); line-height: var(--lh-caption1); letter-spacing: var(--ls-caption1); font-weight: var(--weight-regular); }
.text-caption2 { font-family: var(--font-family); font-size: var(--text-caption2); line-height: var(--lh-caption2); letter-spacing: var(--ls-caption2); font-weight: var(--weight-regular); }
.emphasized { font-weight: var(--weight-semibold); }
.text-large-title.emphasized { font-weight: var(--weight-bold); }
.text-title1.emphasized { font-weight: var(--weight-bold); }
.text-title2.emphasized { font-weight: var(--weight-bold); }
.text-title3.emphasized { font-weight: var(--weight-semibold); }
.text-caption1.emphasized { font-weight: var(--weight-medium); }
.text-caption2.emphasized { font-weight: var(--weight-semibold); }
.text-secondary { color: var(--label-secondary); }
.text-tertiary { color: var(--label-tertiary); }

/* ===== Background Orbs ===== */
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

/* ===== Status Bar ===== */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 16px;
  flex-shrink: 0;
  z-index: 50;
}
.toolbar-leading, .toolbar-trailing { display: flex; gap: var(--space-2); min-width: 60px; }
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

/* ===== Icon Grid ===== */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 12px;
}
.icon-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  text-align: center;
}

/* ===== Separator ===== */
.separator { height: 0.5px; background: var(--separator); margin: 0; }

/* ===== Tab Bar ===== */
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

.bottom-spacer { height: 60px; }

/* ---- Tab Slide Transition ---- */
.tab-slide-left-enter-active,
.tab-slide-left-leave-active,
.tab-slide-right-enter-active,
.tab-slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.25s ease;
}

.tab-slide-left-enter-from {
  transform: translateX(40px);
  opacity: 0;
}
.tab-slide-left-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

.tab-slide-right-enter-from {
  transform: translateX(-40px);
  opacity: 0;
}
.tab-slide-right-leave-to {
  transform: translateX(40px);
  opacity: 0;
}

.tab-content {
  will-change: transform, opacity;
}

/* ===== iOS Material Replacements (was liquid-glass / materials.css) ===== */
.liquid-glass-large {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 0.5px solid rgba(0, 0, 0, 0.06);
}
.liquid-glass-medium {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 0.5px solid rgba(0, 0, 0, 0.05);
}
.liquid-glass-small {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 0.5px solid rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] .liquid-glass-large {
  background: rgba(30, 30, 30, 0.75);
  border-color: rgba(255, 255, 255, 0.08);
}
[data-theme="dark"] .liquid-glass-medium {
  background: rgba(30, 30, 30, 0.65);
  border-color: rgba(255, 255, 255, 0.06);
}
[data-theme="dark"] .liquid-glass-small {
  background: rgba(30, 30, 30, 0.55);
  border-color: rgba(255, 255, 255, 0.05);
}

.material-chip.material-chrome {
  background: linear-gradient(135deg, rgba(200,200,210,0.7), rgba(160,160,180,0.5));
}
.material-chip.material-thick {
  background: rgba(150,150,170,0.6);
}
.material-chip.material-regular {
  background: rgba(180,180,200,0.4);
}
.material-chip.material-thin {
  background: rgba(200,200,220,0.25);
}
.material-chip.material-ultrathin {
  background: rgba(220,220,240,0.12);
}

[data-theme="dark"] .material-chip.material-chrome {
  background: linear-gradient(135deg, rgba(80,80,100,0.7), rgba(60,60,75,0.6));
}
[data-theme="dark"] .material-chip.material-thick {
  background: rgba(70,70,85,0.7);
}
[data-theme="dark"] .material-chip.material-regular {
  background: rgba(65,65,80,0.5);
}
[data-theme="dark"] .material-chip.material-thin {
  background: rgba(60,60,75,0.35);
}
[data-theme="dark"] .material-chip.material-ultrathin {
  background: rgba(55,55,70,0.2);
}
</style>
