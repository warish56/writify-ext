import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import { AppTheme } from './services/theme'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App'



const root = document.createElement('div')
root.id = 'write-ai-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <CssBaseline/>
      <GlobalStyles styles={{
        html:{
          fontSize: '13px'
        }
      }}/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
) 
