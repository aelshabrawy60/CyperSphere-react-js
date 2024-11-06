import { useState } from 'react'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import GuestRoutes from './Routes/GuestRoutes';
import AuthRoutes from './Routes/AuthRoutes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <>
      <BrowserRouter>
      {isAuthenticated ? <AuthRoutes /> : <GuestRoutes />}
      </BrowserRouter>
    </>
  )
}

export default App
