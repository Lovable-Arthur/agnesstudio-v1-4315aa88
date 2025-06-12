
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Após o login bem-sucedido, redireciona diretamente para a agenda
    navigate('/agenda');
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
