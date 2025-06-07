import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BookingPage from './components/BookingPage';
import ComplaintsPage from './components/ComplaintsPage';
import AdminPanel from './components/AdminPanel';

const AppContent = () => {
  const { user } = useApp();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'bookings':
        return <BookingPage />;
      case 'complaints':
        return <ComplaintsPage />;
      case 'admin':
        return user.role === 'admin' ? <AdminPanel /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
