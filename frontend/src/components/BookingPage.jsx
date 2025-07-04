import React, { useState, useEffect } from 'react';
import { Calendar, Clock, WashingMachine, ChefHat, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { user, addBooking, bookings, cancelBooking } = useApp();
  const [selectedFacility, setSelectedFacility] = useState('washing-machine');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent rendering if not logged in

  const facilities = [
    { id: 'washing-machine', name: 'Washing Machine', icon: WashingMachine, color: 'blue' },
    { id: 'pantry', name: 'Pantry', icon: ChefHat, color: 'teal' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : format(date, 'MMM d'),
      fullLabel: format(date, 'EEEE, MMMM d'),
    };
  });

  const isTimeSlotBooked = (date, time, facility) => {
    return bookings.some(
      booking =>
        booking.date === date &&
        booking.timeSlot === time &&
        booking.facility === facility &&
        booking.status === 'confirmed'
    );
  };

  const handleBooking = () => {
    if (!selectedTime || !user) return;

    if (isTimeSlotBooked(selectedDate, selectedTime, selectedFacility)) {
      alert('This time slot is already booked!');
      return;
    }

    addBooking({
      userId: user.id,
      userName: user.name,
      apartment: user.apartment,
      facility: selectedFacility,
      date: selectedDate,
      timeSlot: selectedTime,
      status: 'confirmed',
    });

    setSelectedTime('');
    alert('Booking confirmed successfully!');
  };

  const userBookings = bookings.filter(b => b.userId === user.id);

  return (
    <div className="space-y-8 mt-20">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Book Facility</h1>
        <p className="text-gray-600">Reserve washing machine or pantry slots</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Make a Reservation</h2>

          {/* Facility Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Facility</label>
            <div className="grid grid-cols-2 gap-3">
              {facilities.map((facility) => {
                const Icon = facility.icon;
                return (
                  <button
                    key={facility.id}
                    onClick={() => setSelectedFacility(facility.id)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedFacility === facility.id
                        ? `border-${facility.color}-500 bg-${facility.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 mx-auto mb-2 ${
                        selectedFacility === facility.id
                          ? `text-${facility.color}-600`
                          : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        selectedFacility === facility.id
                          ? `text-${facility.color}-700`
                          : 'text-gray-600'
                      }`}
                    >
                      {facility.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableDates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label} - {date.fullLabel}
                </option>
              ))}
            </select>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isBooked = isTimeSlotBooked(selectedDate, time, selectedFacility);
                return (
                  <button
                    key={time}
                    onClick={() => !isBooked && setSelectedTime(time)}
                    disabled={isBooked}
                    className={`p-2 text-sm border rounded-md transition-colors ${
                      isBooked
                        ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed'
                        : selectedTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedTime}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Confirm Booking
          </button>
        </div>

        {/* My Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">My Bookings</h2>

          {userBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userBookings
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {booking.facility === 'washing-machine' ? (
                            <WashingMachine className="h-5 w-5 text-blue-600" />
                          ) : (
                            <ChefHat className="h-5 w-5 text-teal-600" />
                          )}
                          <span className="font-medium text-gray-900 capitalize">
                            {booking.facility.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-600">Time: {booking.timeSlot}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            booking.status === 'confirmed'
                              ? 'text-green-700 bg-green-100'
                              : 'text-red-700 bg-red-100'
                          }`}
                        >
                          {booking.status === 'confirmed' ? (
                            <CheckCircle className="h-3 w-3 inline mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 inline mr-1" />
                          )}
                          {booking.status}
                        </span>
                        {booking.status === 'confirmed' && new Date(booking.date) > new Date() && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

