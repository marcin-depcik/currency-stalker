import { DataBoard } from '@/components/DataBoard'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
)

import '@/styles/components/App.scss'

export const App = () => {
  return (
    <div className="app-container">
      <DataBoard />
    </div>
  )
}
