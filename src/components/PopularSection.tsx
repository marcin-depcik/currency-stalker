import '@/styles/components/PopularSection.scss'

import { Card } from '@/components/common/Card'
import { GoogleIcon } from '@/components/common/GoogleIcon'
import { LoadingContent } from '@/components/common/LoadingContent'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { currencyState } from '@/redux/features/currencySlice'

export const PopularSection = () => {
  const [foldPopular, setFoldPopular] = useState('')
  const { euro, pound } = useSelector(currencyState)

  const isUpOrDown = (trend: number) => {
    if (trend > 0) {
      return 'up'
    } else if (trend < 0) {
      return 'down'
    } else {
      return 'flat'
    }
  }
  return (
    <section id="popular" className={`popular ${foldPopular}`}>
      <Card className="title">
        <h3>Popular currencies</h3>
        <GoogleIcon
          onClick={() => setFoldPopular(foldPopular ? '' : 'fold')}
          name="expand_less"
        />
      </Card>
      <LoadingContent className="title">
        <div className="content">
          <Card className="small-card">
            <div className="logo">
              <GoogleIcon name="euro" />
              <span className="name">EUR</span>
            </div>
            <div className="info">
              <GoogleIcon
                className={`trend ${isUpOrDown(euro.trend)}`}
                name={`trending_${isUpOrDown(euro.trend)}`}
              />
              <div className="text">
                <div className="wrapper">
                  <span>Current trend</span>
                  <span className={`trend ${isUpOrDown(euro.trend)}`}>
                    {euro.trend}
                  </span>
                </div>
                <h3>{euro.mid} PLN</h3>
              </div>
            </div>
          </Card>
          <Card className="small-card">
            <div className="logo">
              <GoogleIcon name="currency_pound" />
              <span className="name">GBP</span>
            </div>
            <div className="info">
              <GoogleIcon
                className={`trend ${isUpOrDown(pound.trend)}`}
                name={`trending_${isUpOrDown(pound.trend)}`}
              />
              <div className="text">
                <div className="wrapper">
                  <span>Current trend</span>
                  <span className={`trend ${isUpOrDown(pound.trend)}`}>
                    {pound.trend}
                  </span>
                </div>
                <h3>{pound.mid} PLN</h3>
              </div>
            </div>
          </Card>
        </div>
      </LoadingContent>
    </section>
  )
}
