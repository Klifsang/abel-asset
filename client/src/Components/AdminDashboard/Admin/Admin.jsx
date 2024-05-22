import React, { useContext, useEffect, useState } from 'react';
import NavAdmin from '../NavAdmin/NavAdmin';
import Content from '../Content/Content';
import { AuthContext } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated, logout, requests, fetchRequests } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/form');
    }
    setLoading(false); // Mark loading as complete
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleBackButton = () => {
      logout();
      navigate('/form');
    };
    window.onpopstate = handleBackButton;
    return () => {
      window.onpopstate = null;
    };
  }, [navigate, logout]);

  if (loading) {
    return null; // Render nothing while loading
  }

  fetchRequests();

  return (
    <section className="admin">
      <NavAdmin setIsOpen={setIsOpen} requests={requests} />
      <Content isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}

export default Admin;
