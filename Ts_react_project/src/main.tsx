import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CardProvider } from './context/CardProvider'
import {ProductsProvider} from './context/ProductsProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductsProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </ProductsProvider>
  </React.StrictMode>,
)
