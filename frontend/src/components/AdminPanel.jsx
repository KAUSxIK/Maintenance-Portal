import React, { useState } from 'react';
import { Settings, Calendar, AlertCircle, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const AdminPanel = () => {
  const { getAllBookings, getAllComplaints, updateComplaintStatus } = useApp();
  const [activeTab, setActiveTab] = useState('complaints');
  const [adminNotes, setAdminNotes] = useState({});

  const allBookings = getAllBookings();
  const allComplaints = getAllComplaints();

  const tabs = [
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
  ];

  const handleStatusUpdate = (complaintId, newStatus) => {
    const notes = adminNotes[complaintId] || '';
    updateComplaintStatus(complaintId, newStatus, notes);
    setAdminNotes({ ...adminNotes, [complaintId]: '' });
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'text-gray-700 bg-gray-100';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100';
      case 'high':
        return 'text-orange-700 bg-orange-100';
      case 'urgent':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const stats = [
    {
      label: 'Total Bookings',
      value: allBookings.length,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Open Complaints',
      value: allComplaints.filter(c => c.status === 'pending' || c.status === 'in-progress').length,
      icon: AlertCircle,
      color: 'text-orange-600 bg-orange-100',
    },
    {
      label: 'Resolved Issues',
      value: allComplaints.filter(c => c.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">Manage community facilities and resolve complaints</p>
      </div>

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

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'complaints' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Manage Complaints</h2>

              {allComplaints.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No complaints submitted</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {allComplaints
                    .sort((a, b) => {
                      const statusPriority = { pending: 0, 'in-progress': 1, resolved: 2, closed: 3 };
                      if (statusPriority[a.status] !== statusPriority[b.status]) {
                        return statusPriority[a.status] - statusPriority[b.status];
                      }
                      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    })
                    .map((complaint) => (
                      <div key={complaint.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                                {complaint.status.replace('-', ' ')}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(complaint.priority)}`}>
                                {complaint.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{complaint.description}</p>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span>Resident: {complaint.userName} (Apt {complaint.apartment})</span>
                              <span>•</span>
                              <span>Category: {complaint.category}</span>
                              <span>•</span>
                              <span>Submitted: {format(new Date(complaint.createdAt), 'MMM d, yyyy')}</span>
                            </div>
                          </div>
                        </div>

                        {complaint.adminNotes && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-md">
                            <p className="text-sm font-medium text-blue-800">Previous Notes:</p>
                            <p className="text-sm text-blue-700">{complaint.adminNotes}</p>
                          </div>
                        )}

                        {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
                          <div className="border-t border-gray-200 pt-4">
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Admin Notes
                                </label>
                                <textarea
                                  value={adminNotes[complaint.id] || ''}
                                  onChange={(e) =>
                                    setAdminNotes({ ...adminNotes, [complaint.id]: e.target.value })
                                  }
                                  rows={2}
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Add notes about the resolution or status update..."
                                />
                              </div>
                              <div className="flex space-x-2">
                                {complaint.status === 'pending' && (
                                  <button
                                    onClick={() => handleStatusUpdate(complaint.id, 'in-progress')}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                                  >
                                    Start Working
                                  </button>
                                )}
                                {(complaint.status === 'pending' || complaint.status === 'in-progress') && (
                                  <button
                                    onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
                                  >
                                    Mark Resolved
                                  </button>
                                )}
                                <button
                                  onClick={() => handleStatusUpdate(complaint.id, 'closed')}
                                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-colors"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">All Bookings</h2>

              {allBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No bookings found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resident
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Facility
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booked On
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allBookings
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                                <div className="text-sm text-gray-500">Apt {booking.apartment}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 capitalize">
                                {booking.facility.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm text-gray-900">
                                  {format(new Date(booking.date), 'MMM d, yyyy')}
                                </div>
                                <div className="text-sm text-gray-500">{booking.timeSlot}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                booking.status === 'confirmed'
                                  ? 'text-green-700 bg-green-100'
                                  : 'text-red-700 bg-red-100'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(booking.createdAt), 'MMM d, yyyy')}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
