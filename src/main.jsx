import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './WeatherApp/index.css'
import App from './WeatherApp/App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
