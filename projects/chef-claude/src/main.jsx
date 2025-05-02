import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import MyApp from './myApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyApp />
  </StrictMode>,
)
