import React, { useState } from 'react';
import EditProfile from '../../../Components/Platform/EditProfile/EditProfile';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Cybersecurity Specialist',
    email: 'john.doe@example.com',
    location: 'Cairo, Egypt',
    bio: 'Passionate about cybersecurity and helping others learn. Specialized in penetration testing and network security.',
    skills: ['Penetration Testing', 'Network Security', 'Malware Analysis', 'Incident Response'],
    certifications: ['CEH', 'CISSP', 'CompTIA Security+'],
    experience: [
      {
        title: 'Senior Security Analyst',
        company: 'CyberGuard Solutions',
        duration: '2020 - Present'
      },
      {
        title: 'Security Consultant',
        company: 'SecureNet Technologies',
        duration: '2018 - 2020'
      }
    ]
  });

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
        </div>
        <div className="bg-[#111111] rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
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
        </div>
      </div>

      {/* Experience */}
      <div className="bg-[#111111] rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Experience</h3>
        <div className="space-y-4">
          {profile.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-[#2A69B5] pl-4">
              <h4 className="font-semibold text-white">{exp.title}</h4>
              <p className="text-[#2A69B5]">{exp.company}</p>
              <p className="text-gray-400 text-sm">{exp.duration}</p>
            </div>
          ))}
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
