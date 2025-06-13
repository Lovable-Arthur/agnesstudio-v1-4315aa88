
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('auth_token');
      const sessionExpiry = localStorage.getItem('session_expiry');
      const userEmail = localStorage.getItem('user_email');

      if (token && sessionExpiry && userEmail) {
        const now = new Date().getTime();
        const expiry = parseInt(sessionExpiry);

        if (now < expiry) {
          setIsAuthenticated(true);
          setUser({ email: userEmail });
          // Reset session expiry
          const newExpiry = now + (30 * 60 * 1000); // 30 minutes
          localStorage.setItem('session_expiry', newExpiry.toString());
        } else {
          // Session expired
          clearSession();
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  // Auto logout after inactivity
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      if (isAuthenticated) {
        timeoutId = setTimeout(() => {
          logout();
        }, 30 * 60 * 1000); // 30 minutes
      }
    };

    const handleActivity = () => {
      if (isAuthenticated) {
        const now = new Date().getTime();
        const newExpiry = now + (30 * 60 * 1000);
        localStorage.setItem('session_expiry', newExpiry.toString());
        resetTimeout();
      }
    };

    if (isAuthenticated) {
      resetTimeout();
      window.addEventListener('mousedown', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('scroll', handleActivity);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [isAuthenticated]);

  const clearSession = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('session_expiry');
    localStorage.removeItem('user_email');
    setIsAuthenticated(false);
    setUser(null);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in production, this would be a real API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simple authentication check - in production, this would be server-side
      if (email === 'admin@admin.com' && password === 'admin') {
        const now = new Date().getTime();
        const expiry = now + (30 * 60 * 1000); // 30 minutes
        
        // Generate a simple session token
        const token = btoa(`${email}:${now}`);
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('session_expiry', expiry.toString());
        localStorage.setItem('user_email', email);
        
        setIsAuthenticated(true);
        setUser({ email });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    clearSession();
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
