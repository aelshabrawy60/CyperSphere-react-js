import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatDots, BsPerson, BsGear } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoMdBook } from "react-icons/io";
import { LuFlag } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiHome5Line } from "react-icons/ri";
import { GoProjectRoadmap } from "react-icons/go";
import { CgWebsite } from "react-icons/cg";
import { LuVideo } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";
import { MessageCircle } from 'lucide-react';

import DropdownItem from './DrodownItem/DropdownItem';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  const menuItems = [
    { path: '/', icon: <RiHome5Line />, label: 'Home' },
    { path: '/academy', icon: <IoMdBook />, label: 'Academy' },
    { path: '/ctf', icon: <LuFlag />, label: 'CTF' },
    { path: '/jobs', icon: <MdOutlineWorkOutline />, label: 'Jobs' },
    { path: '/chatbot', icon: <BsChatDots />, label: 'Chatbot' },
    { path: '/profile', icon: <BsPerson />, label: 'Profile' },
    { path: '/groups', icon: <MessageCircle />, label: 'Groups' },
  ];

  const academyMenuItems = [
    { path: '/academy/learning-path', icon: <GoProjectRoadmap />, label: 'Learning Path' },
    { path: '/academy/resources', icon: <LuVideo />, label: 'Resources' },
    { path: '/academy/blog', icon: <CgWebsite />, label: 'Blog' },
    { path: '/academy/tools', icon: <VscTools />, label: 'Tools' },
  ];

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <AiOutlineMenu />
      </button>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="logo ps-3">
          <span>CyberSphere</span>
        </div>

        <nav className="nav-menu mb-4">
          {menuItems.map((item) => (
            <React.Fragment key={item.path}>
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>

              {location.pathname.startsWith('/academy') && item.path === '/academy' ? (
                <DropdownItem navs={academyMenuItems} open={true} />
              ) : null}
            </React.Fragment>
          ))}

        </nav>

        <div className='text-xs text-gray-400 mb-2 flex gap-2'>
            <Link to={'/privacy-policy'}  className='mb-1 text-gray-400'>Privacy Policy</Link>
            <Link to={'/terms-of-service'} className='text-gray-400'>Terms of Services</Link>
        </div>

        <div className="logout">
          
          <div onClick={handleLogout} className="nav-item" style={{ cursor: 'pointer' }}>
            <span className="icon"><BiLogOut /></span>
            <span className="label">Logout</span>
          </div>
        </div>
      </div>

      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default Sidebar;
