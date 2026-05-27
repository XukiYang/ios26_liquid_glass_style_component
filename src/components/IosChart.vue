<template>
  <div class="ios-chart" :style="{ height: height }">
    <component :is="chartComponent" :data="chartData" :options="mergedOptions" />
  </div>
</template>

<script setup>
/**
 * IosChart — Unified chart component wrapping Chart.js.
 *
 * Supports: line, bar, pie, doughnut, radar, area (line with fill).
 * Automatically applies iOS 26 design tokens for colors, fonts, and dark mode.
 *
 * @prop {'line'|'bar'|'pie'|'doughnut'|'radar'|'area'} [type='line'] - Chart type
 * @prop {Object} data - Chart.js data object ({ labels, datasets })
 * @prop {Object} [options] - Chart.js options (merged with iOS defaults)
 * @prop {string} [height='300px'] - Container height
 */
import { computed, watch, ref } from 'vue'
import { Line, Bar, Pie, Doughnut, Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
)

const props = defineProps({
  type: {
    type: String,
    default: 'line',
    validator: (v) => ['line', 'bar', 'pie', 'doughnut', 'radar', 'area'].includes(v),
  },
  data: { type: Object, required: true },
  options: { type: Object, default: () => ({}) },
  height: { type: String, default: '300px' },
})

const chartComponent = computed(() => {
  const map = { line: Line, bar: Bar, pie: Pie, doughnut: Doughnut, radar: Radar, area: Line }
  return map[props.type] || Line
})

function resolveCssVar(value) {
  if (typeof value !== 'string') return value
  if (!value.startsWith('var(')) return value
  const varName = value.slice(4, -1).trim()
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || value
}

function resolveDataColors(data) {
  const resolved = JSON.parse(JSON.stringify(data))
  for (const ds of resolved.datasets) {
    if (ds.borderColor) ds.borderColor = resolveCssVar(ds.borderColor)
    if (ds.backgroundColor) {
      ds.backgroundColor = Array.isArray(ds.backgroundColor)
        ? ds.backgroundColor.map(resolveCssVar)
        : resolveCssVar(ds.backgroundColor)
    }
    if (ds.pointBackgroundColor) ds.pointBackgroundColor = resolveCssVar(ds.pointBackgroundColor)
  }
  return resolved
}

const chartData = computed(() => resolveDataColors(props.data))

function getThemeColors() {
  const cs = getComputedStyle(document.documentElement)
  return {
    labelPrimary: cs.getPropertyValue('--label-primary').trim() || '#000',
    labelSecondary: cs.getPropertyValue('--label-secondary').trim() || 'rgba(60,60,67,0.6)',
    labelTertiary: cs.getPropertyValue('--label-tertiary').trim() || 'rgba(60,60,67,0.3)',
    separator: cs.getPropertyValue('--separator').trim() || 'rgba(0,0,0,0.12)',
    fontFamily: cs.getPropertyValue('--font-family').trim() || 'sans-serif',
    blue: cs.getPropertyValue('--color-blue').trim() || '#0088ff',
    red: cs.getPropertyValue('--color-red').trim() || '#ff383c',
    green: cs.getPropertyValue('--color-green').trim() || '#34c759',
    orange: cs.getPropertyValue('--color-orange').trim() || '#ff8d28',
    purple: cs.getPropertyValue('--color-purple').trim() || '#cb30e0',
    teal: cs.getPropertyValue('--color-teal').trim() || '#00c3d0',
    pink: cs.getPropertyValue('--color-pink').trim() || '#ff2d55',
    indigo: cs.getPropertyValue('--color-indigo').trim() || '#6155f5',
  }
}

const iosPalette = computed(() => {
  const c = getThemeColors()
  return [c.blue, c.green, c.orange, c.red, c.purple, c.teal, c.pink, c.indigo]
})

const defaultOptions = computed(() => {
  const c = getThemeColors()
  const isArea = props.type === 'area'

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 350, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: c.labelSecondary,
          font: { family: c.fontFamily, size: 12 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { family: c.fontFamily, size: 13, weight: '600' },
        bodyFont: { family: c.fontFamily, size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
      },
      title: { display: false },
    },
    scales: ['pie', 'doughnut', 'radar'].includes(props.type)
      ? undefined
      : {
          x: {
            grid: { color: c.separator, drawBorder: false },
            ticks: { color: c.labelTertiary, font: { family: c.fontFamily, size: 11 } },
          },
          y: {
            grid: { color: c.separator, drawBorder: false },
            ticks: { color: c.labelTertiary, font: { family: c.fontFamily, size: 11 } },
            beginAtZero: true,
          },
        },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4,
        fill: isArea,
      },
      point: {
        radius: props.type === 'line' ? 3 : 0,
        hoverRadius: 5,
        borderWidth: 2,
        backgroundColor: '#fff',
      },
      bar: {
        borderRadius: 6,
        borderSkipped: false,
      },
      arc: {
        borderWidth: 2,
        borderColor: c.separator,
      },
    },
    ...(isArea ? { fill: 'origin' } : {}),
  }
})

const mergedOptions = computed(() => {
  return deepMerge(defaultOptions.value, props.options)
})

function deepMerge(target, source) {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      result[key] = deepMerge(target[key], source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}
</script>

<style scoped>
.ios-chart {
  position: relative;
  width: 100%;
  font-family: var(--font-family);
}
</style>
