import { Chart } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'

export function configurarChartJS() {
  Chart.register(zoomPlugin)
}
