import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/SignupPage';
import Dashboard from './components/Dashboard';
import BookingPage from './components/BookingPage';
import ComplaintsPage from './components/ComplaintsPage';
import AdminPanel from './components/AdminPanel';
import Front from './components/Front';
import About from './components/About';
import Footer from './components/Footer';

import PrivateRoute from './components/PrivateRoute'; // ✅ Import

export const AppRoutes = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const { user } = useApp();

  return (
    <>
      {!isAdminPath && <Navbar key={user?.id || 'guest'} setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <PrivateRoute>
              <ComplaintsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            user && user.isAdmin ? <AdminPanel /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

