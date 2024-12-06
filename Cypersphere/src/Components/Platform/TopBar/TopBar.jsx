import React from 'react';
import './TopBar.css';
import { FiSearch } from 'react-icons/fi';

const TopBar = () => {
  const getCurrentDate = () => {
    const options = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const getCurrentDay = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="topbar m-3 p-3 px-2 px-md-4 row m-0 align-items-center">
      <div className="topbar-left d-lg-block d-none col-3 col-xl-2">
        <p className="greeting mb-1">Good morning,</p>
        <h2 className="user-name">Ahmed</h2>
      </div>
      <div className="topbar-center col">
        <div className="search-container ps-3 py-1 w-100">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-right d-lg-block d-none col-3 col-xl-2">
        <div className="date-info">
          <span className="date">{getCurrentDate()}</span>
          <span className="day">{getCurrentDay()}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
