
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/agenda';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = () => {
    const from = location.state?.from?.pathname || '/agenda';
    navigate(from, { replace: true });
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
