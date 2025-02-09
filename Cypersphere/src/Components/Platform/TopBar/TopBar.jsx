import React from 'react';
import { Search, Bell, Sun } from 'lucide-react';

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-[#1D1D1F] border-b lg:border-0 lg:m-4 lg:rounded-2xl border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="px-8 py-4 lg:py-5 flex justify-between items-center gap-4">
          {/* Left Section */}
          <div className="hidden lg:block">
            <p className="text-gray-400 text-sm mb-0.5">{getGreeting()},</p>
            <h2 className="text-white text-xl font-semibold">Ahmed</h2>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#242424] 
                         text-gray-100 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <Bell className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            </button>
            
            {/* Theme Toggle */}
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <Sun className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            </button>

            {/* Date Display */}
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-gray-200 text-sm font-medium">{getCurrentDate()}</span>
              <span className="text-gray-400 text-sm">{getCurrentDay()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;