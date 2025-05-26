import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import './index.css'
import Login from './pages/Login/Login.tsx'
import Signup from './pages/Signup/Signup.tsx'
//const domain = process.env.AUTH0_DOMAIN;
//const clientId = process.env.AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
