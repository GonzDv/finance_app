import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@/context/AuthContext'
import '@/index.css'
import App from '@/App.jsx'
import "react-beautiful-color/dist/react-beautiful-color.css";
createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <App className="min-h-screen bg-[#121212] text-white pb-20" />
  </AuthProvider>
)
