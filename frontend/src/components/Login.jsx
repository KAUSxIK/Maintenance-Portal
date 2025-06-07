import React, { useState } from 'react';
import { Home, User, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
  const { login } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Demo users (no TypeScript types needed)
  const demoUsers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      apartment: '201',
      phone: '+1-555-0123',
      role: 'resident',
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@example.com',
      apartment: 'Office',
      phone: '+1-555-0100',
      role: 'admin',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = demoUsers.find((u) => u.email === formData.email);
    if (user) {
      login(user);
    } else {
      alert('Invalid credentials. Try: sarah@example.com or admin@example.com');
    }
  };

  const handleDemoLogin = (user) => {
    login(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Home className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Community Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your community facilities and services
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 text-center mb-4">Demo Accounts:</p>
            <div className="space-y-2">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleDemoLogin(user)}
                  className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email} • {user.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
