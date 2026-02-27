import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    {/* Añade el atributo basename con el nombre de tu subcarpeta */}
    <BrowserRouter basename="/arrozmurcia">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
