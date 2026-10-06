import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primeflex/primeflex.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './styles.css'
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)