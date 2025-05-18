import React, { useState, useEffect } from 'react';
import { Search, Bell, Sun } from 'lucide-react';

const TopBar = () => {
  // State for profile data and loading status
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Student ID constant
  const studentId = localStorage.getItem('studentId') || "Admin";

  // Fetch student profile data
  const fetchStudentData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://cybersphere7.runasp.net/api/Student/get-student-by-id?id=${studentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
      
      const data = await response.json();
      
      // Transform API data to match our component's profile structure
      const transformedProfile = {
        name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.userName || 'Anonymous User',
        title: 'Cybersecurity Student', // Default title as API doesn't provide this
        email: data.email || '',
        profilePictureURL: data.profilePictureURL,
        location: data.address || 'Not specified',
        bio: data.about || 'No bio available',
        certifications: [], // API doesn't provide certifications
        experience: [] // API doesn't provide experience
      };
      
      setProfile(transformedProfile);
      return transformedProfile;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching student data:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStudentData();
  }, []);

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

  // Render student name or skeleton loader
  const renderStudentName = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse flex flex-col">
          <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
          <div className="h-6 w-32 bg-gray-700 rounded"></div>
        </div>
      );
    }
    
    if (error) {
      return <h2 className="text-white text-xl font-semibold">User</h2>;
    }
    
    return (
      <>
        <p className="text-gray-400 text-sm mb-0.5">{getGreeting()},</p>
        <h2 className="text-white text-xl font-semibold">{profile?.name || 'User'}</h2>
      </>
    );
  };

  return (
    <div className="bg-[#1D1D1F] border-b lg:border-0 lg:m-4 lg:rounded-2xl border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="px-8 py-4 lg:py-5 flex justify-between items-center gap-4">
          {/* Left Section */}
          <div className="hidden lg:block">
            {renderStudentName()}
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