import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Prevents authenticated users from accessing login/signup */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/overview" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/overview" /> : <LandingPage />} />
        <Route path="/signUp" element={isAuthenticated ? <Navigate to="/overview" /> : <SignUp />} />
        <Route path="/forgotPassword" element={isAuthenticated ? <Navigate to="/overview" /> : <ForgotPassword />} />
        <Route path="/reset-password" element={isAuthenticated ? <Navigate to="/overview" /> : <ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/hte" element={<HTEDashboardPage />} />
          <Route path="/moas" element={<MoasPage />} />
          <Route path="/OJT-coordinators" element={<OJTCoordinatorsPage />} />
          <Route path="/industry-partners" element={<IndustryPartnersPage />} />
          <Route path="/user-account" element={<UserPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/add" element={<AddDataPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;