import { useState } from 'react';
import apiClient from '../api/apiClient';

export default function ContactFormModal({ onClose, onCreated }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim() || !relationship.trim()) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiClient.post('/contacts', { name, phone, relationship });
      onCreated(res.data.contact);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not add contact. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-3 py-2.5 rounded-[10px] border border-border-input text-sm text-text-primary outline-none focus:border-navbar-end transition-colors';

  return (
    <div
      className="fixed inset-0 bg-[#2E1A47]/35 flex items-center justify-center z-50 p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-[360px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-bold text-text-primary mb-4">Add emergency contact</h3>

        {error && <p className="text-[13px] text-danger mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label htmlFor="contact-name" className="block text-[12.5px] font-semibold text-text-muted mb-1.5">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anjali Mehta"
              className={inputClasses}
            />
          </div>
          <div className="mb-3.5">
            <label htmlFor="contact-relationship" className="block text-[12.5px] font-semibold text-text-muted mb-1.5">
              Relationship
            </label>
            <input
              id="contact-relationship"
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="Sister"
              className={inputClasses}
            />
          </div>
          <div className="mb-3.5">
            <label htmlFor="contact-phone" className="block text-[12.5px] font-semibold text-text-muted mb-1.5">
              Phone
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98765 43210"
              className={inputClasses}
            />
          </div>

          <div className="flex gap-2.5 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-pill-bg text-text-primary rounded-[10px] py-2.5 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-navbar-end hover:bg-[#C2166A] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-[10px] py-2.5 text-sm font-semibold transition-colors"
            >
              {submitting ? 'Adding...' : 'Add contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}