import React from 'react'
import ReactDOM from 'react-dom'
import Routes from 'Routes'
import reportWebVitals from 'utils/reportWebVitals'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'theme'
import { QueryClient, QueryClientProvider } from 'react-query'

import 'styles/global.css'

const queryClient = new QueryClient()

ReactDOM.render(
<ThemeProvider theme={theme}>
  <QueryClientProvider client={queryClient}>
  <Routes />
  </QueryClientProvider>
</ThemeProvider>,
document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
