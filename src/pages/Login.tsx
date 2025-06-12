
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import CollaboratorsSpace from '../components/CollaboratorsSpace';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <CollaboratorsSpace onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  );
};

export default Login;
