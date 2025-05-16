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
import Profile from '../Pages/Platform/Profile/Profile';
import ChatGroups from '../Pages/Platform/Groups/Groups';
import ChatFeed from '../Pages/Platform/ChatFeed/ChatFeed';
import AdminHome from '../Pages/Admin/AdminHome';
import AdminBlogs from '../Pages/Admin/AdminBlogs';
import BlogPage from '../Pages/Platform/Academy/BlogPage/BlogPage';
import LevelPage from '../Pages/Platform/Academy/LearningPath/Level/LevelPage';
import CoursePage from '../Pages/Platform/Academy/LearningPath/Course/CoursePage';
import LessonPage from '../Pages/Platform/Academy/LearningPath/Lesson/LessonPage';

function AdminRoutes() {
  const location = useLocation();

  return (
    <div className='auth-routes-container d-flex postion-relative'>
      <Sidebar />
      <div className='auth-routes-content' style={{ flex: 1, transition: 'margin 0.3s ease-in-out' }}>
        {location.pathname == "/" && <TopBar />}
        <div className='routes-content'>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/academy/blog" element={<AdminBlogs />} />
            <Route path="/academy/blog-post/:id" element={<BlogPage />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="academy/learning-path" element={<LearningPath />} />
            <Route path="academy/learning-path/level/:id" element={<LevelPage />} />
            <Route path="academy/learning-path/course/:id" element={<CoursePage />} />
            <Route path="academy/learning-path/lesson/:id" element={<LessonPage />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/academy/resources" element={<Resources />} />
            <Route path="/academy/tools" element={<Tools />} />
            <Route path="/ctf" element={<CTF />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/groups" element={<ChatGroups />} />
            <Route path="/chat_feed" element={<ChatFeed />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminRoutes;
