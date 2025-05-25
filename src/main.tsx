import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import './index.css'

import CreateHousing from './pages/CreateHousing/CreateHousing.tsx'
import HousingCreatedConfirmation from './pages/HousingCreatedConfirmation/HousingCreatedConfirmation.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/housing/new" element={<CreateHousing />} />
        <Route path="/housing/success" element={<HousingCreatedConfirmation />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
