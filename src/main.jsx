import { createRoot } from 'react-dom/client'
import './index.css'
import "react-toastify/dist/ReactToastify.css"; 
import App from './App.jsx'
import CarProvider from './context/CarProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CarProvider >
      <App />
    </CarProvider>
  </AuthProvider>
)
