import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

export function SocketProvider({ token, children }) {
  const [alerts, setAlerts] = useState([]); // active real-time SOS alerts from linked accounts
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) {
      // Logged out — make sure any previous connection is closed.
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: { token }
    });
    socketRef.current = socket;

    socket.on('sos-alert', ({ event, triggeredBy }) => {
      setAlerts((prev) => [
        { id: event._id, triggeredBy, location: event.location, triggeredAt: event.triggeredAt },
        ...prev
      ]);
    });

    socket.on('sos-resolved', ({ event }) => {
      // Drop the resolved alert from the active list, if it's showing.
      setAlerts((prev) => prev.filter((a) => a.id !== event._id));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  const dismissAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <SocketContext.Provider value={{ alerts, dismissAlert }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketAlerts() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocketAlerts must be used within a SocketProvider');
  return ctx;
}