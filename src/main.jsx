import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import initErrorHandlers from './utils/initErrorHandlers'

// Inicia handlers globais para melhorar UX quando ocorrerem erros não capturados
initErrorHandlers();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
