// ============================================
// Navbar.jsx - Top Navigation Bar
// ============================================

import './index.css';
import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { HiArrowRightOnRectangle, HiDocumentText } from 'react-icons/hi2';

function Navbar({ title, showBack = false }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="flex-row items-center gap-sm">
        {showBack && (
          <Link to="/home" className="flex-row items-center gap-xs text-muted" style={{ textDecoration: 'none' }}>
            <HiDocumentText style={{ fontSize: '18px' }} />
            Dashboard
          </Link>
        )}
        {!showBack && (
          <>
            <Link to="/home" className="navbar-brand">
              <div className="navbar-logo">
                <HiDocumentText />
              </div>
              <span className="navbar-title">AI Resume Builder</span>
            </Link>
            {user && (
              <div className="nav-links">
                <Link
                  to="/home"
                  className={`nav-link ${location.pathname === '/home' ? 'nav-link-active' : ''}`}
                >
                  Home
                </Link>
                <Link
                  to="/templates"
                  className={`nav-link ${location.pathname === '/templates' ? 'nav-link-active' : ''}`}
                >
                  Templates
                </Link>
                <Link
                  to="/dashboard"
                  className={`nav-link ${location.pathname === '/dashboard' ? 'nav-link-active' : ''}`}
                >
                  Dashboard
                </Link>
              </div>
            )}
          </>
        )}
        {title && (
          <>
            <span className="navbar-breadcrumb">/</span>
            <span className="navbar-page-title">{title}</span>
          </>
        )}
      </div>

      <div className="flex-row items-center gap-md">
        {user && (
          <>
            <div className="flex-row items-center gap-sm">
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="user-avatar" />
              ) : (
                <div className="user-avatar-placeholder">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <span className="text-muted hide-mobile">{user.name}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <HiArrowRightOnRectangle />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
