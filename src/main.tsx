import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
  <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
  </Provider>
)
