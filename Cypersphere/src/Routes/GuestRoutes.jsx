import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/authentication/SignIn/SignIn';
import SignUp from '../Pages/authentication/SignUp/SignUp';
import LandingPage from '../Pages/LandingPage/LandingPage';
import ResetPass from '../Pages/authentication/ResetPass/ResetPass';
import TermsOfService from '../Pages/TermsOfService/TermsOfService';
import PrivacyPolicy from '../Pages/PrivacyPolicy/PrivacyPolicy';
import DeleteYourData from '../Pages/DeleteYourData/DeleteYourData';
import CyberSphereAcademy from '../Pages/LandingPage/LandingPage';
import CyberSphereHome from '../Pages/LandingPage/LandingPage2';
import CyberSphereLanding from '../Pages/LandingPage/LandingPage2';

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CyberSphereLanding />}/>
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
