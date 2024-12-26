import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import {MemoryRouter} from 'react-router-dom'

import { MainRoute } from './routes/main'
import { AppTheme } from '../../src/services/theme'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
        <MemoryRouter initialEntries={["/payment_success"]}>
            <MainRoute />
        </MemoryRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
