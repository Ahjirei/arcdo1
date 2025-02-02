import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
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
        <Route path="/login" element={<LandingPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected routes */}
        <Route path="/hte" element={<ProtectedRoute><HTEDashboardPage /></ProtectedRoute>} />
        <Route path="/moas" element={<ProtectedRoute><MoasPage /></ProtectedRoute>} />
        <Route path="/OJT-coordinators" element={<ProtectedRoute><OJTCoordinatorsPage /></ProtectedRoute>} />
        <Route path="/industry-partners" element={<ProtectedRoute><IndustryPartnersPage /></ProtectedRoute>} />
        <Route path="/user-account" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
        <Route path="/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
        <Route path="/adminprofile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
        <Route path="/add" element={<AddDataPage />} />


      </Routes>
    </Router>
  );
}

export default App;
