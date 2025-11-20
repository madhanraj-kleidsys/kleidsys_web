import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AnimatedCaps from './components/AnimatedCaps'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <AnimatedCaps /> */}
  </StrictMode>,
)
