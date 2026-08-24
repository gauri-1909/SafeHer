import { createContext, useContext, useState, useCallback } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('safeher_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('safeher_token'));

  const persist = (newToken, newUser) => {
    localStorage.setItem('safeher_token', newToken);
    localStorage.setItem('safeher_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const signup = useCallback(async (name, email, password) => {
    const res = await apiClient.post('/auth/signup', { name, email, password });
    persist(res.data.token, res.data.user);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password });
    persist(res.data.token, res.data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('safeher_token');
    localStorage.removeItem('safeher_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}