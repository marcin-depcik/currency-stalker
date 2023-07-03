import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/App'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

import '@/styles/base.scss'

const customTheme = createTheme({
  typography: {
    fontFamily: 'var(--ff-primary)',
  },
  palette: {
    background: {
      default: 'var(--clr-primary-2)',
    },
    text: {
      primary: 'var(--clr-grey-9)',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
