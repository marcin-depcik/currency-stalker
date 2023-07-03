import '@/styles/components/CurrencyChart.scss'

import { Card } from '@/components/common/Card'
import { useSelector } from 'react-redux'
import { currencyState } from '@/redux/features/currencySlice'
import { Line } from 'react-chartjs-2'
import { useCurrencyChartData } from '@/hooks/useCurrencyChartData'

export const CurrencyChart = () => {
  const {
    historicalCurrency,
    loadingChart,
    currentCurrency,
    currentCurrencyCode,
  } = useSelector(currencyState)

  const data = historicalCurrency.map(({ mid }) => mid)
  const labels = historicalCurrency.map(({ effectiveDate }) =>
    effectiveDate.split('.').slice(0, 2).join('.')
  )

  const { chartData, chartOptions } = useCurrencyChartData(
    data,
    labels,
    currentCurrencyCode
  )

  const startDate =
    historicalCurrency.length && historicalCurrency[0].effectiveDate
  const endDate =
    historicalCurrency.length &&
    historicalCurrency[historicalCurrency.length - 1].effectiveDate

  return loadingChart ? (
    <Card>
      <h3>Loading...</h3>
    </Card>
  ) : (
    <Card className="chart-card">
      <div className="text">
        <h3 className="name">
          {currentCurrencyCode} - {currentCurrency}
        </h3>
        <p>
          Date range: {startDate} - {endDate}
        </p>
      </div>
      <div className="chart">
        <Line data={chartData} options={chartOptions} />
      </div>
    </Card>
  )
}
