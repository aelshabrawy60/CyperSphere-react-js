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

function AuthRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Companies" element={<Companies />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/ctf" element={<CTF />} />
        <Route path="/jobs" element={<Jobs />} />
    </Routes>
  );
}

export default AuthRoutes;
