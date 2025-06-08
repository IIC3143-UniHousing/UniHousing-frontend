import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from './App.tsx';
import './index.css';

import Login from './pages/Login/Login.tsx';
import Signup from './pages/Signup/Signup.tsx';
import CreateHousing from './pages/CreateHousing/CreateHousing.tsx';
import HousingCreatedConfirmation from './pages/HousingCreatedConfirmation/HousingCreatedConfirmation.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import HousingDetail from './pages/HousingDetail/HousingDetail.tsx';
import Navbar from './components/Navbar/Navbar.tsx';

import { UserProvider, useUser } from './context/UserContext';

const Main = () => {
  const { user } = useUser();

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/housing/new" element={<CreateHousing />} />
        <Route path="/housing/success" element={<HousingCreatedConfirmation />} />
        <Route path="/housing/:id" element={<HousingDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);