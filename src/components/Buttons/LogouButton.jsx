import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
    setLoading(false);
  };

  return (
    <Button variant="danger" onClick={handleLogout} disabled={loading}>
      {loading ? 'Logging out...' : 'Log Out'}
    </Button>
  );
}

export default LogoutButton;
