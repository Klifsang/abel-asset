import React, { useContext, useEffect, useState } from 'react';
import NavUser from '../Nav User/NavUser';
import ContentUser from '../Content/ContentUser';
import { AuthContext } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';

function User() {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated,activeUser,assets,messages,fetchMessages } = useContext(AuthContext); 
  const navigate = useNavigate();
  // const [searchQuery, setSearchQuery] = useState('');

  // Debugging: Log authentication status
  console.log('Is authenticated:', isAuthenticated,assets);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/form'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  // Return JSX if authenticated
  fetchMessages()
  if (isAuthenticated) {
    return (
      <section className="admin">
        <NavUser setIsOpen={setIsOpen} messages={messages} />
        <ContentUser isOpen={isOpen} setIsOpen={setIsOpen} activeUser={activeUser} />
      </section>
    );
  }

  return null;
}

export default User;
