
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CollaboratorsSpaceProps {
  onLogout: () => void;
}

const CollaboratorsSpace = ({ onLogout }: CollaboratorsSpaceProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona automaticamente para a agenda após o login
    navigate('/agenda');
  }, [navigate]);

  return null; // Não precisa renderizar nada pois vai redirecionar
};

export default CollaboratorsSpace;
