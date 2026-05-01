import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ 
  showBell = false, 
  onBellClick, 
  isBellActive = false, 
  hasNotification = false,
  showCreateButton = false,
  showBackButton = false 
}) {
  return (
    <header className="main-navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
            <path d="M10 6h4"></path>
            <path d="M10 10h4"></path>
            <path d="M10 14h4"></path>
            <path d="M10 18h4"></path>
          </svg>
          <h2>Smart Campus Hub</h2>
        </Link>
      </div>
      <div className="navbar-actions">
        {showBell && (
          <button 
            className={`icon-button ${isBellActive ? 'active' : ''}`} 
            onClick={onBellClick}
            title={isBellActive ? "Show All Tickets" : "Show My Tickets"}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V10c0-3.07-1.63-5.64-4.5-6.32V3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 4.36 6 6.92 6 10v6l-2 2v1h16v-1l-2-2z" />
            </svg>
            {hasNotification && !isBellActive && <span className="notification-dot" />}
          </button>
        )}
        
        {showCreateButton && (
          <Link className="primary-button" to="/create">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Incident
          </Link>
        )}

        {showBackButton && (
          <Link className="secondary-button" to="/">
            Back to Dashboard
          </Link>
        )}
      </div>
    </header>
  );
}
