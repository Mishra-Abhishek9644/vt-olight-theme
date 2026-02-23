import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const el = document.getElementById("ring-builder");


if (el) {
  createRoot(el).render(
    <StrictMode>
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={2000} />
        <BrowserRouter basename="/pages/ring-builder">
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  )
}