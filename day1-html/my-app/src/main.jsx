import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ← BrowserRouter: reads/writes the URL using the browser's History API
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   {/* ← everything inside can now use routing hooks (useParams, useNavigate, <Link>) */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)