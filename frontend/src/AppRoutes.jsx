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
import { Home } from 'lucide-react';
import Front from './components/Front';
import About from './components/About';
import Footer from './components/Footer';

export const AppRoutes = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const { user } = useApp();

  return (
    <>
     {!isAdminPath && <Navbar key={user?.id || 'guest'} setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Front/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/admin"
          element={
            user && user.isAdmin ? <AdminPanel /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer/>
    </>
  );
};


