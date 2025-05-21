import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/authentication/SignIn/SignIn';
import SignUp from '../Pages/authentication/SignUp/SignUp';
import LandingPage from '../Pages/LandingPage/LandingPage';
import ResetPass from '../Pages/authentication/ResetPass/ResetPass';
import TermsOfService from '../Pages/TermsOfService/TermsOfService';
import PrivacyPolicy from '../Pages/PrivacyPolicy/PrivacyPolicy';
import DeleteYourData from '../Pages/DeleteYourData/DeleteYourData';

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/delete-your-data" element={<DeleteYourData />} />
    </Routes>
  );
}

export default GuestRoutes;
