import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HTEDashboardPage from './pages/HTEDashboardPage';
import MoasPage from './pages/MoasPage';
import OJTCoordinatorsPage from './pages/OJTCoordinatorsPage';
import IndustryPartnersPage from './pages/IndustryPartnersPage';
import UserPage from './pages/UserPage';
import OverviewPage from './pages/OverviewPage';
import AdminProfile from './components/AdminProfile';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPasswordCard';
import AddDataPage from './pages/AddDataPage';



function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/hte" element={<HTEDashboardPage />} />
            <Route path="/moas" element={<MoasPage />} />
            <Route path="/OJT coordinators" element={<OJTCoordinatorsPage />} />
            <Route path="/Industry partners" element={<IndustryPartnersPage />} />
            <Route path="/user_account" element={<UserPage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/login" element={<LandingPage />} />
            <Route path="/adminprofile" element={<AdminProfile />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/add" element={<AddDataPage />} />
          </Routes>
        
    </Router>
  );
}

export default App;
