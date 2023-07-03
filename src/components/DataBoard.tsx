import '@/styles/components/DataBoard.scss'

import {
  getLastTwoRatesGBP,
  getLastTwoRatesEUR,
  getRates,
  getHistoricalCurrency,
  getHistoricalGoldPrice,
} from '@/redux/features/currencySlice'
import { AnyAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TableSection } from './TableSection'
import { PopularSection } from './PopularSection'
import { NavbarSection } from '@/components/NavbarSection'
import { GoldRatesSection } from '@/components/GoldRatesSection/GoldRatesSection'
import { buttonsData } from '@/components/GoldRatesSection/buttonsData'

export const DataBoard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRates() as unknown as AnyAction)
    dispatch(getLastTwoRatesGBP() as unknown as AnyAction)
    dispatch(getLastTwoRatesEUR() as unknown as AnyAction)
    dispatch(getHistoricalCurrency('USD') as unknown as AnyAction)
    dispatch(
      getHistoricalGoldPrice(buttonsData[0].period) as unknown as AnyAction
    )
  }, [dispatch])

  return (
    <div id="top" className="data-board">
      <NavbarSection />
      <PopularSection />
      <TableSection />
      <GoldRatesSection />
    </div>
  )
}
