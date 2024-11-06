import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/authentication/SignIn/SignIn';
import SignUp from '../Pages/authentication/SignUp/SignUp';
import LandingPage from '../Pages/LandingPage/LandingPage';
import ResetPass from '../Pages/authentication/ResetPass/ResetPass';

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPass />} />
    </Routes>
  );
}

export default GuestRoutes;
