import React, { createContext, useContext, useState, useEffect } from 'react';


const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
  try {
    const savedUser = localStorage.getItem('community-portal-user');
    const savedBookings = localStorage.getItem('community-portal-bookings');
    const savedComplaints = localStorage.getItem('community-portal-complaints');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedComplaints) setComplaints(JSON.parse(savedComplaints));
  } catch (err) {
    console.error("Failed to parse localStorage data:", err);
    // Optionally clear corrupted data:
    localStorage.removeItem('community-portal-user');
    localStorage.removeItem('community-portal-bookings');
    localStorage.removeItem('community-portal-complaints');
  }
}, []);


    




  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('community-portal-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('community-portal-user');
  };

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

  const getAllBookings = () => bookings;
  const getAllComplaints = () => complaints;

  return (
    <AppContext.Provider
      value={{
        user,
        bookings: user ? bookings.filter((b) => b.userId === user.id) : [],
        complaints: user ? complaints.filter((c) => c.userId === user.id) : [],

        login,
        logout,
        addBooking,
        cancelBooking,
        addComplaint,
        updateComplaintStatus,
        getAllBookings,
        getAllComplaints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
