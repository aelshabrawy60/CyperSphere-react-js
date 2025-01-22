import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Platform/Home/Home';
import Blog from '../Pages/Platform/Academy/Blog/Blog';
import Companies from '../Pages/Platform/Academy/Companies/Companies';
import LearningPath from '../Pages/Platform/Academy/LearningPath/LearningPath';
import Platforms from '../Pages/Platform/Academy/Platforms/Platforms';
import Resources from '../Pages/Platform/Academy/Resource/Resources';
import Tools from '../Pages/Platform/Academy/Tools/Tools';
import CTF from '../Pages/Platform/CTF/CTF';
import Jobs from '../Pages/Platform/Jobs/Jobs';
import Chatbot from '../Pages/Platform/Chatbot/Chatbot';
import Sidebar from '../Components/Platform/Sidebar/Sidebar';
import TopBar from '../Components/Platform/TopBar/TopBar';
import { useLocation } from 'react-router-dom';
import Settings from '../Pages/Platform/Settings/Settings';

function AuthRoutes() {
  const location = useLocation();

  return (
    <div className='auth-routes-container d-flex postion-relative'>
      <Sidebar />
      <div className='auth-routes-content' style={{ flex: 1, transition: 'margin 0.3s ease-in-out' }}>
        {location.pathname !== '/chatbot' && location.pathname !== '/settings' && location.pathname !== '/jobs' && <TopBar />}
        <div className='routes-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/ctf" element={<CTF />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AuthRoutes;
