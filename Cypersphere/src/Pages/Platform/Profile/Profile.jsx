import React, { useState, useEffect } from 'react';
import EditProfile from '../../../Components/Platform/EditProfile/EditProfile';
import Certificates from '../../../Components/Platform/Certficates/Certficates';
import AddGroup from '../../../Components/Admin/AddGroup';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    email: '',
    location: '',
    bio: '',
    skills: [],
    certifications: [],
    experience: []
  });
  const [loading, setLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [skillError, setSkillError] = useState(null);
  
  // Student ID constant
  const studentId = localStorage.getItem('studentId');

  // Get auth token from local storage
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Fetch student profile data
  const fetchStudentData = async () => {
    try {
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
    }
  };

  // Fetch skills data
  const fetchSkills = async () => {
    try {
      setSkillsLoading(true);
      const token = getAuthToken();
      const response = await fetch(
        `https://cybersphere7.runasp.net/api/StudentSkills/get-skills-by-student-id?StudentId=${studentId}`, 
        {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch skills data');
      }
      
      const data = await response.json();
      return data || [];
    } catch (err) {
      console.error('Error fetching skills:', err);
      setSkillError(err.message);
      return [];
    } finally {
      setSkillsLoading(false);
    }
  };

  // Add a new skill
  const addSkill = async (skillName) => {
    if (!skillName.trim()) return;
    
    try {
      setIsAddingSkill(true);
      setSkillError(null);
      const token = getAuthToken();
      
      const response = await fetch('https://cybersphere7.runasp.net/api/StudentSkills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: skillName.trim(),
          studentId: studentId
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add skill');
      }
      
      // Refresh skills after adding
      const updatedSkills = await fetchSkills();
      setProfile(prev => ({...prev, skills: updatedSkills}));
      setNewSkill('');
    } catch (err) {
      console.error('Error adding skill:', err);
      setSkillError(err.message);
    } finally {
      setIsAddingSkill(false);
    }
  };

  // Delete a skill
  const deleteSkill = async (skillId) => {
    try {
      setSkillError(null);
      const token = getAuthToken();
      
      const response = await fetch(`https://cybersphere7.runasp.net/api/StudentSkills?id=${skillId}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete skill');
      }
      
      // Refresh skills after deleting
      const updatedSkills = await fetchSkills();
      setProfile(prev => ({...prev, skills: updatedSkills}));
    } catch (err) {
      console.error('Error deleting skill:', err);
      setSkillError(err.message);
    }
  };

  // Load profile and skills data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch both profile and skills in parallel
        const [profileData, skillsData] = await Promise.all([
          fetchStudentData(),
          fetchSkills()
        ]);
        
        // Combine the data
        setProfile(prev => ({...profileData, skills: skillsData}));
      } catch (err) {
        // Error handling is done in the individual functions
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [studentId]);

  // Loading skeleton for skills section
  const SkillsSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-8 bg-gray-700 rounded-full w-20"></div>
        ))}
      </div>
    </div>
  );

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-[#111111] rounded-lg p-6 mb-6 animate-pulse">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-700"></div>
            <div className="flex-1 w-full">
              <div className="h-6 bg-gray-700 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-64 mb-4"></div>
              <div className="h-16 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] rounded-lg p-6">
            <SkillsSkeleton />
          </div>
          <div className="bg-[#111111] rounded-lg p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if fetch failed
  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-red-900 bg-opacity-20 text-red-500 p-4 rounded-lg">
          Error: {error}. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="bg-[#111111] rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#2A69B5] flex items-center justify-center text-3xl sm:text-4xl text-white shrink-0 overflow-hidden">
            {profile.profilePictureURL ? (
              <img 
                src={`https://cybersphere7.runasp.net/${profile.profilePictureURL}`} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              profile.name.charAt(0)
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">{profile.name}</h1>
            <h2 className="text-[#2A69B5] text-base sm:text-lg mb-2">{profile.title}</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-400 mb-4">
              <span>{profile.location}</span>
              <span className="hidden sm:inline">•</span>
              <span>{profile.email}</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base">{profile.bio}</p>
          </div>
        </div>
      </div>

      {/* Skills & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#111111] rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          
          {/* Skills error message */}
          {skillError && (
            <div className="bg-red-900 bg-opacity-20 text-red-500 p-2 rounded mb-4 text-sm">
              {skillError}
            </div>
          )}
          
          {/* Add new skill form */}
          <div className="mb-4 flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill..."
              className="bg-[#1A1A1A] text-white px-3 py-2 rounded-l-lg rounded-r-none flex-1"
              disabled={isAddingSkill}
            />
            <button
              onClick={() => addSkill(newSkill)}
              disabled={isAddingSkill || !newSkill.trim()}
              className={`px-4 py-2 rounded-r-lg ${
                isAddingSkill || !newSkill.trim() 
                  ? 'bg-gray-700 text-gray-400' 
                  : 'bg-[#2A69B5] text-white'
              }`}
            >
              {isAddingSkill ? 'Adding...' : 'Add'}
            </button>
          </div>
          
          {/* Skills list with loading state */}
          {skillsLoading ? (
            <SkillsSkeleton />
          ) : profile.skills && profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="bg-[#2A69B5] bg-opacity-20 text-[#2A69B5] px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <span>{skill.name}</span>
                  <button 
                    onClick={() => deleteSkill(skill.id)}
                    className="ml-2 text-[#2A69B5] hover:text-white"
                    aria-label={`Remove ${skill.name} skill`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No skills listed</p>
          )}
        </div>
        
        <div className="bg-[#111111] rounded-lg p-6">
          {/* Using our new Certificates component */}
          <Certificates studentId={studentId} />
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6 flex justify-end">
        <button 
          className="gradient-btn px-6 py-2 rounded-lg"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <EditProfile
          profile={profile}
          studentId={studentId}
          onSave={(updatedProfile) => {
            setProfile(updatedProfile);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default Profile;