import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import './index.css'
import SignupForm from './components/auth/SignupForm.tsx'
//const domain = process.env.AUTH0_DOMAIN;
//const clientId = process.env.AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
