import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SOSButton from '../components/SOSButton';
import ContactList from '../components/ContactList';
import ContactFormModal from '../components/ContactFormModal';
import SOSHistoryList from '../components/SOSHistoryList';
import LinkedAccounts from '../components/LinkedAccounts';
import AlertBanner from '../components/AlertBanner';
import apiClient from '../api/apiClient';
import { useSocketAlerts } from '../context/SocketContext';

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const { alerts, dismissAlert } = useSocketAlerts();

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [contactsRes, sosRes] = await Promise.all([
        apiClient.get('/contacts'),
        apiClient.get('/sos')
      ]);
      setContacts(contactsRes.data.contacts);
      setEvents(sosRes.data.events);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleContactCreated = (contact) => {
    setContacts((prev) => [contact, ...prev]);
  };

  const handleContactDelete = async (id) => {
    try {
      await apiClient.delete(`/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError('Failed to delete contact. Please try again.');
    }
  };

  const handleSOSTriggered = (event) => {
    setEvents((prev) => [event, ...prev]);
  };

  const handleResolve = async (id) => {
    try {
      const res = await apiClient.patch(`/sos/${id}/resolve`);
      setEvents((prev) => prev.map((e) => (e._id === id ? res.data.event : e)));
    } catch (err) {
      setError('Failed to update SOS event. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />

      <div className="max-w-[720px] mx-auto w-full px-5 pt-10 pb-16 flex-1">
        <SOSButton onTriggered={handleSOSTriggered} />

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 px-5 text-text-muted text-sm text-center">
            <div className="w-8 h-8 border-[3px] border-card-border border-t-navbar-end rounded-full animate-spin" />
            <span>Loading your dashboard...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-16 px-5 text-text-muted text-sm text-center">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ContactList
                contacts={contacts}
                onAddClick={() => setShowAddModal(true)}
                onDelete={handleContactDelete}
              />
              <SOSHistoryList events={events} onResolve={handleResolve} />
            </div>

            <div className="mt-5">
              <LinkedAccounts />
            </div>
          </>
        )}
      </div>

      {showAddModal && (
        <ContactFormModal
          onClose={() => setShowAddModal(false)}
          onCreated={handleContactCreated}
        />
      )}
    </div>
  );
}