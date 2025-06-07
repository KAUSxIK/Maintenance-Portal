import React from 'react';
import { Calendar, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format, isToday, isTomorrow } from 'date-fns';

const Dashboard = () => {
  const { user, bookings, complaints } = useApp();

  const upcomingBookings = bookings
    .filter(b => b.status === 'confirmed' && new Date(b.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentComplaints = complaints
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const stats = [
    {
      label: 'Active Bookings',
      value: bookings.filter(b => b.status === 'confirmed' && new Date(b.date) >= new Date()).length,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Open Complaints',
      value: complaints.filter(c => c.status === 'pending' || c.status === 'in-progress').length,
      icon: AlertCircle,
      color: 'text-orange-600 bg-orange-100',
    },
    {
      label: 'Resolved Issues',
      value: complaints.filter(c => c.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
    },
  ];

  const getDateLabel = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'in-progress':
        return 'text-blue-700 bg-blue-100';
      case 'resolved':
        return 'text-green-700 bg-green-100';
      case 'closed':
        return 'text-gray-700 bg-gray-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening in your community</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>

          {upcomingBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No upcoming bookings</p>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {booking.facility.replace('-', ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {getDateLabel(booking.date)} at {booking.timeSlot}
                    </p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Complaints</h2>
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>

          {recentComplaints.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No complaints submitted</p>
          ) : (
            <div className="space-y-3">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{complaint.title}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {format(new Date(complaint.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('-', ' ')}
                    </span>
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

export default Dashboard;
