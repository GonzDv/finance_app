import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@/context/AuthContext'
import '@/index.css'
import App from '@/App.jsx'
import "react-beautiful-color/dist/react-beautiful-color.css";
createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <App />
  </AuthProvider>
)
