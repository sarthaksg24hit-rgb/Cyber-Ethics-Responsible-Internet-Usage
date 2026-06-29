import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    closeMobile();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobile}>
          <Shield size={24} className="navbar-logo-icon" />
          <span className="navbar-logo-text">CyberEthics</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar-nav">
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/about"
                  className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {user?.isAdmin ? (
                  <Link
                    to="/admin"
                    className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
                  >
                    Dashboard
                  </Link>
                )}
              </li>
              <li className="navbar-user">
                <div className="navbar-avatar">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button className="btn-ghost" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger */}
        <button className="navbar-hamburger" onClick={toggleMobile} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`navbar-mobile ${mobileOpen ? 'open' : ''}`}>
        {!isAuthenticated ? (
          <>
            <Link
              to="/about"
              className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
              onClick={closeMobile}
            >
              About
            </Link>
            <div className="navbar-mobile-divider" />
            <Link to="/login" className="btn-secondary" onClick={closeMobile}>
              Login
            </Link>
            <Link to="/signup" className="btn-primary" onClick={closeMobile}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {user?.isAdmin ? (
              <Link
                to="/admin"
                className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
                onClick={closeMobile}
              >
                Admin
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={closeMobile}
              >
                Dashboard
              </Link>
            )}
            <div className="navbar-mobile-divider" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px' }}>
              <div className="navbar-avatar">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                {user?.name || 'User'}
              </span>
            </div>
            <button className="btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
