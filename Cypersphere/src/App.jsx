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

  // Function to check if token is expired
  const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    
    if (expirationTime) {
      const currentTime = new Date().getTime();
      const expTime = new Date(expirationTime).getTime();
      
      if (currentTime > expTime) {
        // Token is expired, clear it
        clearAuthData();
        return true; // expired
      } else {
        // Token still valid, set up timer to clear when it expires
        setupExpirationTimer(expTime);
        return false; // not expired
      }
    }
    return true; // No expiration time means treat as expired
  };

  // Clear auth data from localStorage
  const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('tokenExpiration');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Setup timer to automatically clear token when it expires
  const setupExpirationTimer = (expirationTime) => {
    const currentTime = new Date().getTime();
    const timeUntilExpiration = expirationTime - currentTime;
    
    if (timeUntilExpiration > 0) {
      setTimeout(() => {
        clearAuthData();
      }, timeUntilExpiration);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const adminFlag = localStorage.getItem('isAdmin');

    if (token) {
      // Only set authenticated if token isn't expired
      const isExpired = checkTokenExpiration();
      
      if (!isExpired) {
        setIsAuthenticated(true);
        setIsAdmin(adminFlag === 'true');
      }
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