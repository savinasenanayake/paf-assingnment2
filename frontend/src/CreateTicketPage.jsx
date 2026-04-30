import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const API_BASE = 'http://localhost:8081/api';
const priorities = ['Low', 'Medium', 'High', 'Critical'];

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    resourceName: '',
    location: '',
    category: '',
    description: '',
    priority: 'Medium',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    attachments: [],
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.resourceName.trim()) newErrors.resourceName = true;
    if (!form.location.trim()) newErrors.location = true;
    if (!form.category.trim()) newErrors.category = true;
    if (!form.contactName.trim()) newErrors.contactName = true;
    
    if (form.description.trim().length < 10) {
      newErrors.description = true;
      setErrorMessage('Description should be at least 10 characters long.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.contactEmail && !emailRegex.test(form.contactEmail)) {
      newErrors.contactEmail = true;
      setErrorMessage('Please enter a valid email address.');
    }

    if (!form.contactEmail && !form.contactPhone) {
      newErrors.contactEmail = true;
      newErrors.contactPhone = true;
      setErrorMessage('Please provide at least one contact method (Email or Phone).');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleAttachmentChange = async (files) => {
    const selectedFiles = Array.from(files).slice(0, 3);
    const images = await Promise.all(
      selectedFiles.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }))
    );
    setForm(prev => ({ ...prev, attachments: images }));
  };

  const createTicket = async () => {
    setErrorMessage('');
    if (!validate()) {
      if (!errorMessage) setErrorMessage('Please fill in all required fields marked in red.');
      return;
    }

    const response = await fetch(`${API_BASE}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const newTicket = await response.json();
      const saved = localStorage.getItem('myTickets');
      const myTickets = saved ? JSON.parse(saved) : [];
      myTickets.push(newTicket.id);
      localStorage.setItem('myTickets', JSON.stringify(myTickets));
      localStorage.setItem('hasNewTicket', 'true');
      navigate('/');
    } else {
      setErrorMessage('Unable to create ticket. Check your inputs and try again.');
    }
  };

  return (
    <div className="app-shell">
      <Header showBackButton={true} />

      <main className="grid-layout single-column">
        <section className="panel card form-panel">
          <h2>Incident Request Form</h2>
          <div className="field-grid">
            <label>
              Resource or Room <span className="required-star">*</span>
              <input className={errors.resourceName ? 'invalid-field' : ''} value={form.resourceName} onChange={e => handleInputChange('resourceName', e.target.value)} placeholder="e.g. Room 212 / Lab A" />
            </label>
            <label>
              Location <span className="required-star">*</span>
              <input className={errors.location ? 'invalid-field' : ''} value={form.location} onChange={e => handleInputChange('location', e.target.value)} placeholder="e.g. Science Building" />
            </label>
            <label>
              Category <span className="required-star">*</span>
              <input className={errors.category ? 'invalid-field' : ''} value={form.category} onChange={e => handleInputChange('category', e.target.value)} placeholder="e.g. Projector issue" />
            </label>
            <label>
              Priority
              <select value={form.priority} onChange={e => handleInputChange('priority', e.target.value)}>
                {priorities.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            </label>
            <label className="full-width">
              Description <span className="required-star">*</span>
              <textarea className={errors.description ? 'invalid-field' : ''} value={form.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="Describe the problem in detail (min 10 chars)." rows="4" />
            </label>
            <label>
              Requester Name <span className="required-star">*</span>
              <input className={errors.contactName ? 'invalid-field' : ''} value={form.contactName} onChange={e => handleInputChange('contactName', e.target.value)} placeholder="Your name" />
            </label>
            <label>
              Email <span className="muted-note">(Contact required)</span>
              <input className={errors.contactEmail ? 'invalid-field' : ''} value={form.contactEmail} onChange={e => handleInputChange('contactEmail', e.target.value)} placeholder="you@example.edu" />
            </label>
            <label>
              Phone <span className="muted-note">(Contact required)</span>
              <input className={errors.contactPhone ? 'invalid-field' : ''} value={form.contactPhone} onChange={e => handleInputChange('contactPhone', e.target.value)} placeholder="Optional" />
            </label>
            <label className="full-width">
              Attach Images (up to 3)
              <input type="file" accept="image/*" multiple onChange={e => handleAttachmentChange(e.target.files)} />
            </label>
          </div>
          <div className="preview-row">
            {form.attachments.map((src, index) => (
              <div key={index} className="image-preview">
                <img src={src} alt={`Attachment ${index + 1}`} />
              </div>
            ))}
          </div>
          {errorMessage && <div className="error-banner">{errorMessage}</div>}
          <button className="primary-button" onClick={createTicket}>Submit Incident</button>
        </section>
      </main>
    </div>
  );
}
