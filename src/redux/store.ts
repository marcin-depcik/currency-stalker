import { configureStore } from '@reduxjs/toolkit'
import { currencySlice } from '@/redux/features/currencySlice'

export const store = configureStore({
  reducer: {
    currencyReducer: currencySlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
