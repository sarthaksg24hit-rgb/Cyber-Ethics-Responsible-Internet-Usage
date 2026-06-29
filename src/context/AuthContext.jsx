import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:3001/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('cyberethics_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('cyberethics_token'));
  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('cyberethics_token');
      const storedUser = localStorage.getItem('cyberethics_user');

      if (!storedToken || !storedUser) {
        localStorage.removeItem('cyberethics_token');
        localStorage.removeItem('cyberethics_user');
        setToken(null);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Just validate the token is still accepted by the server
        const res = await fetch(`${API_BASE}/user/progress`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (res.ok) {
          // Token valid — keep user from localStorage
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } else {
          // Token invalid — clear everything
          localStorage.removeItem('cyberethics_token');
          localStorage.removeItem('cyberethics_user');
          setToken(null);
          setUser(null);
        }
      } catch {
        localStorage.removeItem('cyberethics_token');
        localStorage.removeItem('cyberethics_user');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('cyberethics_token', data.token);
    localStorage.setItem('cyberethics_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    localStorage.setItem('cyberethics_token', data.token);
    localStorage.setItem('cyberethics_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cyberethics_token');
    localStorage.removeItem('cyberethics_user');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
