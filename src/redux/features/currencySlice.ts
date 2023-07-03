import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { RootState } from '@/redux/store'
import { trendCounter } from '@/utils/trendCounter'

export interface IRate {
  currency: string
  code: string
  mid: number
}

export interface IState {
  errorMessage: string
  loading: boolean
  loadingChart: boolean
  table: string
  effectiveDate: string
  euro: {
    trend: number
    mid: number
  }
  pound: {
    trend: number
    mid: number
  }
  rates: Array<IRate>
  filteredRates: Array<IRate>
  historicalCurrency: Array<{
    effectiveDate: string
    mid: number
  }>
  currentCurrency: string
  currentCurrencyCode: string
  historicalGoldPrice: Array<{
    date: string
    price: number
  }>
}

const BASE_API_URL = 'https://api.nbp.pl/api/exchangerates'
const GOLD_API_URL = 'https://api.nbp.pl/api/cenyzlota'

const initialState: IState = {
  errorMessage: '',
  loading: false,
  loadingChart: false,
  table: '',
  effectiveDate: '',
  euro: { trend: 0, mid: 0 },
  pound: { trend: 0, mid: 0 },
  rates: [],
  filteredRates: [],
  historicalCurrency: [],
  currentCurrency: '',
  currentCurrencyCode: '',
  historicalGoldPrice: [],
}

export const getRates = createAsyncThunk('currency/getRates', async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/tables/A/`)
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err.response && err.response.data ? err.response.data : error
  }
})

export const getLastTwoRatesGBP = createAsyncThunk(
  'currency/getLastTwoRatesGBP',
  async () => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/rates/A/GBP/last/2`)
      return data
    } catch (error) {
      const err = error as AxiosError
      throw err.response && err.response.data ? err.response.data : error
    }
  }
)

export const getLastTwoRatesEUR = createAsyncThunk(
  'currency/getLastTwoRatesEUR',
  async () => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/rates/A/EUR/last/2`)
      return data
    } catch (error) {
      const err = error as AxiosError
      throw err.response && err.response.data ? err.response.data : error
    }
  }
)

export const getHistoricalCurrency = createAsyncThunk(
  'currency/getHistoricalCurrency',
  async (code: string) => {
    try {
      const { data } = await axios.get(
        `${BASE_API_URL}/rates/A/${code}/last/14`
      )
      return data
    } catch (error) {
      const err = error as AxiosError
      throw err.response && err.response.data ? err.response.data : error
    }
  }
)

export const getHistoricalGoldPrice = createAsyncThunk(
  'currency/getHistoricalGoldPrice',
  async (period: number) => {
    try {
      const { data } = await axios.get(`${GOLD_API_URL}/last/${period}`)
      return data
    } catch (error) {
      const err = error as AxiosError
      throw err.response && err.response.data ? err.response.data : error
    }
  }
)

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    searchRatesByCode(state, { payload }) {
      const query = payload.toLowerCase()

      state.filteredRates = state.rates.filter(({ code }) =>
        code.toLowerCase().includes(query)
      )
    },
  },
  extraReducers(builder) {
    builder
      // getRates
      .addCase(getRates.pending, (state) => {
        state.loading = true
      })
      .addCase(getRates.fulfilled, (state, { payload }) => {
        const { table, effectiveDate, rates } = payload[0]
        state.table = table
        state.effectiveDate = new Date(effectiveDate)
          .toLocaleString()
          .split(',')[0]
        state.rates = rates
        state.filteredRates = rates
        state.loading = false
      })
      .addCase(getRates.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Unknown Error'

        console.error('Error message: ', state.errorMessage)

        state.loading = false
      })
      // getLastTwoRatesGBP
      .addCase(getLastTwoRatesGBP.pending, (state) => {
        state.loading = true
      })
      .addCase(getLastTwoRatesGBP.fulfilled, (state, { payload }) => {
        const rates = payload.rates

        const prevRate = rates.shift().mid
        const currentRate = rates.pop().mid

        state.pound.trend = trendCounter(prevRate, currentRate)
        state.pound.mid = parseFloat(currentRate.toFixed(4))

        state.loading = false
      })
      .addCase(getLastTwoRatesGBP.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Unknown Error'

        console.error('Error message: ', state.errorMessage)

        state.loading = false
      })
      // getLastTwoRatesEUR
      .addCase(getLastTwoRatesEUR.pending, (state) => {
        state.loading = true
      })
      .addCase(getLastTwoRatesEUR.fulfilled, (state, { payload }) => {
        const rates = payload.rates

        const prevRate = rates.shift().mid
        const currentRate = rates.pop().mid

        state.euro.trend = trendCounter(prevRate, currentRate)
        state.euro.mid = parseFloat(currentRate.toFixed(4))

        state.loading = false
      })
      .addCase(getLastTwoRatesEUR.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Unknown Error'

        console.error('Error message: ', state.errorMessage)

        state.loading = false
      })
      // getHistoricalCurrency
      .addCase(getHistoricalCurrency.pending, (state) => {
        state.loadingChart = true
      })
      .addCase(getHistoricalCurrency.fulfilled, (state, { payload }) => {
        state.currentCurrency = payload.currency
        state.currentCurrencyCode = payload.code
        state.historicalCurrency = payload.rates.map(
          (el: { effectiveDate: string; mid: number }) => ({
            ...el,
            effectiveDate: new Date(el.effectiveDate)
              .toLocaleString()
              .split(',')[0],
          })
        )

        state.loadingChart = false
      })
      .addCase(getHistoricalCurrency.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Unknown Error'

        console.error('Error message: ', state.errorMessage)

        state.loadingChart = false
      })
      // getHistoricalGoldPrice
      .addCase(getHistoricalGoldPrice.pending, (state) => {
        state.loadingChart = true
      })
      .addCase(getHistoricalGoldPrice.fulfilled, (state, { payload }) => {
        state.historicalGoldPrice = payload.map(
          (el: { data: string; cena: number }) => ({
            price: el.cena,
            date: new Date(el.data).toLocaleString().split(',')[0],
          })
        )

        state.loadingChart = false
      })
      .addCase(getHistoricalGoldPrice.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Unknown Error'

        console.error('Error message: ', state.errorMessage)

        state.loadingChart = false
      })
  },
})

export const currencyState = (state: RootState) => state.currencyReducer

export const { searchRatesByCode } = currencySlice.actions
