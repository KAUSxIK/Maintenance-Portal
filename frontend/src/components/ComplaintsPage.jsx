import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const priorities = [
  { value: 'low', label: 'Low', color: 'text-gray-700 bg-gray-100' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-700 bg-yellow-100' },
  { value: 'high', label: 'High', color: 'text-orange-700 bg-orange-100' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-700 bg-red-100' },
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'in-progress':
      return <AlertCircle className="h-4 w-4" />;
    case 'resolved':
      return <CheckCircle className="h-4 w-4" />;
    case 'closed':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
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
  const priorityObj = priorities.find(p => p.value === priority);
  return priorityObj ? priorityObj.color : 'text-gray-700 bg-gray-100';
};

const ComplaintsPage = () => {
  const { user, complaints, addComplaint } = useApp();
  const navigate = useNavigate(); // ✅ required for redirect
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: 'plumbing',
    title: '',
    description: '',
    priority: 'medium',
  });

  const titleRef = useRef(null);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent rendering before redirect

  const categories = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'security', label: 'Security' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    if (showForm && titleRef.current) {
      titleRef.current.focus();
    }
  }, [showForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }

    addComplaint({
      userId: user.id,
      userName: user.name,
      apartment: user.apartment,
      category: formData.category,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
    });

    setFormData({
      category: 'plumbing',
      title: '',
      description: '',
      priority: 'medium',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8 mt-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Complaints</h1>
          <p className="text-gray-600">Report and track maintenance issues</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          aria-label="Open new complaint form"
        >
          <Plus className="h-4 w-4" />
          <span>New Complaint</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Submit New Complaint</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close complaint form"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                id="title"
                type="text"
                required
                ref={titleRef}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description of the issue, location, and any other relevant information"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Complaints</h2>
        </div>

        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No complaints submitted</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {complaints
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((complaint) => (
                <div key={complaint.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-1">{complaint.status.replace('-', ' ')}</span>
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{complaint.description}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>Category: {complaint.category}</span>
                        <span>•</span>
                        <span>Submitted: {format(new Date(complaint.createdAt), 'MMM d, yyyy')}</span>
                        {complaint.resolvedAt && (
                          <>
                            <span>•</span>
                            <span>Resolved: {format(new Date(complaint.resolvedAt), 'MMM d, yyyy')}</span>
                          </>
                        )}
                      </div>
                      {complaint.adminNotes && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-md">
                          <p className="text-sm font-medium text-blue-800">Admin Notes:</p>
                          <p className="text-sm text-blue-700">{complaint.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsPage;
