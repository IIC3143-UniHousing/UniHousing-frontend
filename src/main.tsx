import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import './index.css'
import Login from './pages/Login/Login.tsx'
import Signup from './pages/Signup/Signup.tsx'
//const domain = process.env.AUTH0_DOMAIN;
//const clientId = process.env.AUTH0_CLIENT_ID;

import Navbar from './components/Navbar/Navbar.tsx'

import CreateHousing from './pages/CreateHousing/CreateHousing.tsx'
import HousingCreatedConfirmation from './pages/HousingCreatedConfirmation/HousingCreatedConfirmation.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'
import HousingDetail from './pages/HousingDetail/HousingDetail.tsx'

import { useState } from 'react'

const Main = () => {
  const [user, setUser] = useState<{ type: 'propietario' | 'student' } | null>({ type: 'propietario' });

  return (
    <StrictMode>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/housing/new" element={<CreateHousing />} />
          <Route path="/housing/success" element={<HousingCreatedConfirmation />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/housing/:id" element={<HousingDetail />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Main />);