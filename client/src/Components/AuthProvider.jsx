// AuthProvider.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import HttpClient from '../HttpClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [requests,setRequests] =useState([])
  const [messages,setMessages] = useState([])
   

  const login = () => {
    setIsAuthenticated(true);
  };

 
  const logout = () => {
    deleteUser();
    // You can customize other logout actions (e.g., clear tokens, reset state)
    setIsAuthenticated(false);
    setActiveUser(null)
  };

  const fetchRequests = () => {
    HttpClient.get('api/requests')
      .then((response) => setRequests(response.data))
      .catch((error) => console.error('Error fetching requests:', error));
  };


  const fetchMessages = () => {
    HttpClient.get('api/approved')
    .then((response) => {
       const filteredMessages = response.data.filter(message => message.userId === activeUser.id);
       setMessages(filteredMessages);
     })
    .catch((error) => console.error('Error fetching messages:', error));
  };

  useEffect(() => {
    // Fetch users and assets as before
    fetchRequests(); // Call fetchRequests to fetch the requests
  }, []);



  useEffect(() => {
    fetchMessages()
    
  }, [activeUser.id]); // Added activeUser.id as a dependency
   

  useEffect(() => {
    HttpClient.get('api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
    HttpClient.get('api/assets')
      .then((response) => setAssets(response.data))
      .catch((error) => console.error('Error fetching assets:', error));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, users, assets, requests, activeUser,setActiveUser,fetchRequests,messages,fetchMessages }}>
      {children}
    </AuthContext.Provider>
  );
};
