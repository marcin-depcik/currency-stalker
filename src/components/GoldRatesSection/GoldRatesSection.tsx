import '@/styles/components/GoldRatesSection.scss'

import { useState } from 'react'
import { GoogleIcon } from '@/components/common/GoogleIcon'
import { Card } from '@/components/common/Card'
import { LoadingContent } from '@/components/common/LoadingContent'
import { useSelector } from 'react-redux'
import {
  currencyState,
  getHistoricalGoldPrice,
} from '@/redux/features/currencySlice'
import { useCurrencyChartData } from '@/hooks/useCurrencyChartData'
import { Line } from 'react-chartjs-2'
import { useDispatch } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import { buttonsData } from '@/components/GoldRatesSection/buttonsData'

export const GoldRatesSection = () => {
  const dispatch = useDispatch()
  const [foldGoldSection, setGoldSection] = useState('')
  const [active, setActive] = useState(buttonsData[0].period)
  const { historicalGoldPrice } = useSelector(currencyState)

  const data = historicalGoldPrice.map(({ price }) => price)
  const labels = historicalGoldPrice.map(({ date }) =>
    date.split('.').slice(0, 2).join('.')
  )

  const startDate = historicalGoldPrice.length && historicalGoldPrice[0].date
  const endDate =
    historicalGoldPrice.length &&
    historicalGoldPrice[historicalGoldPrice.length - 1].date

  const { chartData, chartOptions } = useCurrencyChartData(data, labels, 'Gold')

  const handleClick = (period: number) => {
    setActive(period)
    dispatch(getHistoricalGoldPrice(period) as unknown as AnyAction)
  }

  return (
    <section id="gold-rates" className={`gold-rates ${foldGoldSection}`}>
      <Card className="title">
        <h3>Gold Rates</h3>
        <GoogleIcon
          onClick={() => setGoldSection(foldGoldSection ? '' : 'fold')}
          name="expand_less"
        />
      </Card>
      <LoadingContent className="title">
        <div className="content">
          <Card>
            <div className="navigation">
              <div className="buttons">
                {buttonsData.map(({ label, period }) => (
                  <button
                    key={label + period}
                    className={active === period ? 'active' : ''}
                    onClick={() => handleClick(period)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p>
                Date range: {startDate} - {endDate}
              </p>
            </div>
            <div className="chart">
              <Line data={chartData} options={chartOptions} />
            </div>
          </Card>
        </div>
      </LoadingContent>
    </section>
  )
}
