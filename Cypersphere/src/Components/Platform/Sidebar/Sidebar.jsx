import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Import icons from react-icons
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import { FaGraduationCap, FaFlag } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { BsChatDots, BsPerson, BsGear } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoMdBook } from "react-icons/io";
import { LuFlag } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiHome5Line } from "react-icons/ri";
import DropdownItem from './DrodownItem/DropdownItem';
import { GoProjectRoadmap } from "react-icons/go";
import { CgWebsite } from "react-icons/cg";
import { LuVideo } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";
import { icons, MessageCircle } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
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

  const menuItems = [
    { path: '/', icon: <RiHome5Line />, label: 'Home' },
    { path: '/academy', icon: <IoMdBook />, label: 'Academy' },
    { path: '/ctf', icon: <LuFlag />, label: 'CTF' },
    { path: '/jobs', icon: <MdOutlineWorkOutline />, label: 'Jobs' },
    { path: '/chatbot', icon: <BsChatDots />, label: 'Chatbot' },
    { path: '/profile', icon: <BsPerson />, label: 'Profile' },
    { path: '/settings', icon: <BsGear />, label: 'Settings' },
    { path: '/groups', icons: <MessageCircle/>, label: 'Groups'}
  ];

  const academyMenuItems = [
    { path: '/academy/learning-path', icon: <GoProjectRoadmap /> , label: 'Learning Path' },
    { path: '/academy/resources', icon: <LuVideo />, label: 'Resources' },
    { path: '/academy/blog', icon: <CgWebsite />, label: 'blog' },
    { path: '/academy/tools', icon: <VscTools /> , label: 'Tools' },
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
            <>
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
              {location.pathname.startsWith('/academy') && item.path === '/academy' ?
                <>
                {console.log(location.pathname)} 
                <DropdownItem navs={academyMenuItems} open={true} />
                </>
                :
                <DropdownItem navs={academyMenuItems} open={false} />
               
              }
            </>
          ))}
        </nav>

        <div className="logout">
          <Link to="/logout" className="nav-item">
            <span className="icon"><BiLogOut /></span>
            <span className="label">Logout</span>
          </Link>
        </div>
      </div>
      {isOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default Sidebar;