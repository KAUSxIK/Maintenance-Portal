import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();

  // Hide navbar on admin panel
  if (location.pathname.startsWith("/admin")) return null;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const linkClass = "text-white hover:text-gray-300 font-medium";

  return (
    <nav className="bg-[#800000] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-white">
            Kapili Maintenance
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/bookings" className={linkClass}>Bookings</NavLink>
            <NavLink to="/complaints" className={linkClass}>Complaints</NavLink>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-white text-[#800000] px-6 py-2 rounded hover:bg-gray-200 transition-all font-semibold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white text-[#800000] px-6 py-2 rounded hover:bg-gray-200 transition-all font-semibold"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#800000] px-4 pt-2 pb-4 shadow">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block py-2 text-white hover:text-gray-300">Home</NavLink>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className="block py-2 text-white hover:text-gray-300">Dashboard</NavLink>
          <NavLink to="/bookings" onClick={() => setMenuOpen(false)} className="block py-2 text-white hover:text-gray-300">Bookings</NavLink>
          <NavLink to="/complaints" onClick={() => setMenuOpen(false)} className="block py-2 text-white hover:text-gray-300">Complaints</NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full py-2 mt-2 bg-white text-[#800000] text-center rounded hover:bg-gray-200 font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="block w-full py-2 mt-2 bg-white text-[#800000] text-center rounded hover:bg-gray-200 font-semibold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
