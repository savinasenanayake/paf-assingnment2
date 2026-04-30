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
          <h2>Tikech</h2>
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
