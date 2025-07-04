import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext(undefined);

// Custom hook to use AppContext
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Safe JSON parser
const safeParse = (item) => {
  try {
    if (!item || item === 'undefined') return null;
    return JSON.parse(item);
  } catch {
    return null;
  }
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const savedUser = safeParse(localStorage.getItem('user'));
    const savedBookings = safeParse(localStorage.getItem('community-portal-bookings'));
    const savedComplaints = safeParse(localStorage.getItem('community-portal-complaints'));

    if (savedUser) setUser(savedUser);
    if (savedBookings) setBookings(savedBookings);
    if (savedComplaints) setComplaints(savedComplaints);
  }, []);

  // Login user and save to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout user and clear data
  const logout = () => {
    setUser(null);
    setBookings([]);
    setComplaints([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('community-portal-bookings');
    localStorage.removeItem('community-portal-complaints');
  };

  // Booking handlers
  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('community-portal-bookings', JSON.stringify(updatedBookings));
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('community-portal-bookings', JSON.stringify(updatedBookings));
  };

  // Complaint handlers
  const addComplaint = (complaintData) => {
    const newComplaint = {
      ...complaintData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedComplaints = [...complaints, newComplaint];
    setComplaints(updatedComplaints);
    localStorage.setItem('community-portal-complaints', JSON.stringify(updatedComplaints));
  };

  const updateComplaintStatus = (complaintId, status, adminNotes) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === complaintId
        ? {
            ...complaint,
            status,
            adminNotes,
            resolvedAt: status === 'resolved' ? new Date().toISOString() : complaint.resolvedAt,
          }
        : complaint
    );
    setComplaints(updatedComplaints);
    localStorage.setItem('community-portal-complaints', JSON.stringify(updatedComplaints));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        bookings: user ? bookings.filter((b) => b.userId === user.id || user.isAdmin) : [],
        complaints: user ? complaints.filter((c) => c.userId === user.id || user.isAdmin) : [],
        login,
        logout,
        addBooking,
        cancelBooking,
        addComplaint,
        updateComplaintStatus,
        getAllBookings: () => bookings,
        getAllComplaints: () => complaints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
