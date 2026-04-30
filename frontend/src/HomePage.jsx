import { useEffect, useState } from 'react';
import Header from './components/Header';

const API_BASE = 'http://localhost:8081/api';
const formatDate = (value) => value ? new Date(value).toLocaleString() : 'N/A';

export default function HomePage() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showMyTicketsOnly, setShowMyTicketsOnly] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await fetch(`${API_BASE}/tickets`);
    const data = await response.json();
    setTickets(data);
  };

  const getMyTicketIds = () => {
    const saved = localStorage.getItem('myTickets');
    return saved ? JSON.parse(saved) : [];
  };

  const filteredTickets = showMyTicketsOnly 
    ? tickets.filter(t => getMyTicketIds().includes(t.id))
    : [];

  const selectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };





  const currentTicket = selectedTicket ? tickets.find(t => t.id === selectedTicket.id) : null;

  const hasNewTicket = localStorage.getItem('hasNewTicket') === 'true';

  const toggleMyTickets = () => {
    setShowMyTicketsOnly(!showMyTicketsOnly);
    if (!showMyTicketsOnly) {
      localStorage.removeItem('hasNewTicket');
    }
  };

  return (
    <div className="app-shell">
      <Header 
        showBell={true}
        onBellClick={toggleMyTickets}
        isBellActive={showMyTicketsOnly}
        hasNotification={hasNewTicket}
        showCreateButton={true}
      />

      <main className="grid-layout">
        {showMyTicketsOnly && (
          <section className="panel card list-panel">
          <div className="list-header">
            <h2>Tickets</h2>
            <span className="muted-note">Click a ticket to view its details</span>
          </div>
          <div className="ticket-list">
            {filteredTickets.length === 0 ? (
              <div className="empty-state">
                {showMyTicketsOnly 
                  ? "You haven't created any tickets yet." 
                  : "Welcome! Click the bell icon to view your reported incidents."}
              </div>
            ) : filteredTickets.map(ticket => (
              <div key={ticket.id} className={`ticket-card ${currentTicket?.id === ticket.id ? 'selected' : ''}`} onClick={() => selectTicket(ticket)}>
                <div className="ticket-card-header">
                  <h3>{ticket.resourceName || 'Untitled'}</h3>
                  <span className={`status-chip status-${ticket.status.toLowerCase()}`}>{ticket.status.replace('_', ' ')}</span>
                </div>
                <p className="ticket-subtitle">{ticket.category} · {ticket.priority}</p>
                <p className="ticket-meta">{ticket.location} · {ticket.contactName}</p>
                <p className="ticket-meta">Requested: {formatDate(ticket.createdAt)}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        {currentTicket ? (
          <section className="panel card detail-panel">
            <div className="detail-header">
              <div>
                <h2>Ticket #{currentTicket.id} Details</h2>
                <p className="muted-note">Current status: <strong>{currentTicket.status}</strong></p>
              </div>
              <div className="detail-header-actions">
              </div>
            </div>

            <div className="detail-grid">
              <div>
                <h3>Summary</h3>
                <div className="info-row"><span>Resource</span><span>{currentTicket.resourceName}</span></div>
                <div className="info-row"><span>Location</span><span>{currentTicket.location}</span></div>
                <div className="info-row"><span>Category</span><span>{currentTicket.category}</span></div>
                <div className="info-row"><span>Priority</span><span>{currentTicket.priority}</span></div>
                <div className="info-row"><span>Requester</span><span>{currentTicket.contactName}</span></div>
                <div className="info-row"><span>Contact</span><span>{currentTicket.contactEmail || currentTicket.contactPhone}</span></div>
                <div className="info-row"><span>Requested On</span><span>{formatDate(currentTicket.createdAt)}</span></div>
                <div className="info-block"><strong>Description</strong><p>{currentTicket.description}</p></div>

              </div>

              <div>
                <h3>Attachments</h3>
                <div className="preview-row">
                  {currentTicket.attachments?.length ? currentTicket.attachments.map((src, index) => (
                    <div key={index} className="image-preview small">
                      <img src={src} alt={`Attachment ${index + 1}`} />
                    </div>
                  )) : <p className="muted-note">No images added.</p>}
                </div>
              </div>
            </div>


          </section>
        ) : null}
      </main>
    </div>
  );
}
