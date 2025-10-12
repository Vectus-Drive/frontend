import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CarProvider from './context/CarProvider.jsx'

createRoot(document.getElementById('root')).render(
  <CarProvider >
    <App />
  </CarProvider>
)
