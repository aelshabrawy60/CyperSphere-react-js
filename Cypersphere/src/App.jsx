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
    localStorage.removeItem('studentId');
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

  // Function to parse JWT token and extract expiration
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  };

  // Function to handle URL parameters
  const handleUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const studentId = urlParams.get('studentId');
    
    if (token) {
      try {
        // Parse the JWT token to get expiration
        const decodedToken = parseJwt(token);
        
        if (decodedToken && decodedToken.exp) {
          // Store authentication data
          localStorage.setItem('authToken', token);
          localStorage.setItem('isAdmin', 'false'); // External login is not admin
          
          // Convert exp (in seconds) to milliseconds and store
          const expirationTime = new Date(decodedToken.exp * 1000).toISOString();
          localStorage.setItem('tokenExpiration', expirationTime);
          
          // Store studentId if available
          if (studentId) {
            localStorage.setItem('studentId', studentId);
          }
          
          // Set up expiration timer
          setupExpirationTimer(decodedToken.exp * 1000);
          
          // Update state
          setIsAuthenticated(true);
          setIsAdmin(false);
          
          // Clean URL by removing the token parameter (optional)
          window.history.replaceState({}, document.title, window.location.pathname);
          
          return true;
        }
      } catch (error) {
        console.error('Error processing token from URL:', error);
      }
    }
    return false;
  };
  
  useEffect(() => {
    // First check for token in URL (external login redirect)
    const processedUrlToken = handleUrlParams();
    
    // If no token was processed from URL, check localStorage
    if (!processedUrlToken) {
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