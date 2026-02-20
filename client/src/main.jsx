import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
const el = document.getElementById("ring-builder");


if (el) {
  createRoot(el).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/pages/ring-builder">      
        <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  )
}