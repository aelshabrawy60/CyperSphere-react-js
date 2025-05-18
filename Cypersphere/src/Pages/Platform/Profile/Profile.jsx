import React, { useState, useEffect } from 'react';
import EditProfile from '../../../Components/Platform/EditProfile/EditProfile';

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
  const [error, setError] = useState(null);
  
  // Student ID constant
  const studentId = 6;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
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
          location: data.address || 'Not specified',
          bio: data.about || 'No bio available',
          skills: data.allSkills ? data.allSkills : [],
          certifications: [], // API doesn't provide certifications
          experience: [] // API doesn't provide experience
        };
        
        setProfile(transformedProfile);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto flex justify-center items-center h-64">
        <div className="text-[#2A69B5] text-xl">Loading profile data...</div>
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
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#2A69B5] flex items-center justify-center text-3xl sm:text-4xl text-white shrink-0">
            {profile.name.charAt(0)}
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
          {profile.skills && profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-[#2A69B5] bg-opacity-20 text-[#2A69B5] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No skills listed</p>
          )}
        </div>
        <div className="bg-[#111111] rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          {profile.certifications && profile.certifications.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert, index) => (
                <span 
                  key={index} 
                  className="border border-[#2A69B5] text-white px-3 py-1 rounded-full text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No certifications listed</p>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-[#111111] rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Experience</h3>
        {profile.experience && profile.experience.length > 0 ? (
          <div className="space-y-4">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-[#2A69B5] pl-4">
                <h4 className="font-semibold text-white">{exp.title}</h4>
                <p className="text-[#2A69B5]">{exp.company}</p>
                <p className="text-gray-400 text-sm">{exp.duration}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No experience listed</p>
        )}
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