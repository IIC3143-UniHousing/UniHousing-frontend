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
import Profile from './pages/Profile/Profile.tsx';

import { UserProvider, useUser } from './context/UserContext';
import HousingListPage from './pages/HousingList/housingList.tsx'
import MyPropertiesPage from './pages/MyProperties/MyProperties.tsx';
import DashboardHousing from './pages/DashboardHousing/DashboardHousing.tsx';


const Main = () => {
  const { user } = useUser();

  return (

    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/housings/" element={<HousingListPage />} />
        <Route path="/housing/new" element={<CreateHousing />} />
        <Route path="/housing/success" element={<HousingCreatedConfirmation />} />
        <Route path="/housing/:id" element={<HousingDetail />} />
        <Route path="/my-housings" element={<MyPropertiesPage />} />
        <Route path="/housing/:id/edit" element={<DashboardHousing />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
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