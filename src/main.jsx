import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'modern-normalize'
import './reset.css'
import './index.css'
import App from './components/App/App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
      <App />
    </BrowserRouter>
  </StrictMode>,
)
