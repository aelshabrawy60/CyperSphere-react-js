import { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import GuestRoutes from './Routes/GuestRoutes';
import AuthRoutes from './Routes/AuthRoutes';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const adminFlag = localStorage.getItem('isAdmin');

    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminFlag === 'true');
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        isAdmin ? <AdminRoutes /> : <AuthRoutes />
      ) : (
        <GuestRoutes />
      )}
    </BrowserRouter>
  );
}

export default App;
