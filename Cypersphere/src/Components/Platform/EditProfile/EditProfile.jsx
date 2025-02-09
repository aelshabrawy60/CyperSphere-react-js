import React, { useState, useEffect } from 'react';

const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-[#2A69B5] text-white'
        : 'text-[#2A69B5] hover:bg-[#2A69B5] hover:bg-opacity-20'
    }`}
  >
    {children}
  </button>
);

const EditProfile = ({ profile, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    email: profile.email,
    location: profile.location,
    bio: profile.bio,
    skills: profile.skills.join(', '),
    certifications: profile.certifications.join(', ')
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const filledFields = Object.entries(formData).filter(([_, value]) => value.trim() !== '').length;
    setProgress((filledFields / Object.keys(formData).length) * 100);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.bio.length > 500) newErrors.bio = 'Bio must be less than 500 characters';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...profile,
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
        certifications: formData.certifications.split(',').map(cert => cert.trim()).filter(Boolean)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#111111] p-6 rounded-lg w-full max-w-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <div className="text-sm text-gray-400">
              {Math.round(progress)}% Complete
            </div>
          </div>
          
          <div className="w-full bg-gray-800 h-2 rounded-full">
            <div 
              className="h-full bg-[#2A69B5] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <TabButton
            isActive={activeTab === 'basic'}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </TabButton>
          <TabButton
            isActive={activeTab === 'about'}
            onClick={() => setActiveTab('about')}
          >
            About
          </TabButton>
          <TabButton
            isActive={activeTab === 'expertise'}
            onClick={() => setActiveTab('expertise')}
          >
            Expertise
          </TabButton>
        </div>

        <form onSubmit={handleSubmit} className="min-h-[400px]">
          {activeTab === 'basic' && (
            <div className="bg-[#1A1A1A] p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-[#2A69B5]">Basic Information</h3>
              <div>
                <label className="block mb-2">
                  Name
                  <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-400 ml-2">(required)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`main-input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block mb-2" title="Your professional title or role">
                  Title
                  <span className="text-xs text-gray-400 ml-2">(e.g., Security Analyst, Pentester)</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="Enter your professional title"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`main-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="City, Country"
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-[#1A1A1A] p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-[#2A69B5]">About You</h3>
              
              <div>
                <label className="block mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="8"
                  className={`main-input resize-none ${errors.bio ? 'border-red-500' : ''}`}
                  placeholder="Tell us about yourself, your experience, and your interests..."
                />
                <div className="flex justify-between items-center mt-1">
                  <span className={`text-sm ${formData.bio.length > 450 ? 'text-yellow-500' : 'text-gray-400'}`}>
                    {formData.bio.length}/500 characters
                  </span>
                  {errors.bio && (
                    <p className="text-red-500 text-sm">{errors.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expertise' && (
            <div className="bg-[#1A1A1A] p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-[#2A69B5]">Expertise</h3>
              
              <div>
                <label className="block mb-2">
                  Skills
                  <span className="text-xs text-gray-400 ml-2">(separate with commas)</span>
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="e.g., Penetration Testing, Network Security, Python"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Add your technical skills and areas of expertise
                </p>
              </div>

              <div>
                <label className="block mb-2">
                  Certifications
                  <span className="text-xs text-gray-400 ml-2">(separate with commas)</span>
                </label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="e.g., CEH, CISSP, OSCP"
                />
                <p className="text-xs text-gray-400 mt-1">
                  List your professional certifications and achievements
                </p>
              </div>
            </div>
          )}
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'expertise') setActiveTab('about');
                else if (activeTab === 'about') setActiveTab('basic');
              }}
              className={`px-4 py-2 rounded-lg text-[#2A69B5] hover:bg-[#2A69B5] hover:bg-opacity-20 transition-colors ${
                activeTab === 'basic' ? 'invisible' : ''
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'basic') setActiveTab('about');
                else if (activeTab === 'about') setActiveTab('expertise');
              }}
              className={`px-4 py-2 rounded-lg text-[#2A69B5] hover:bg-[#2A69B5] hover:bg-opacity-20 transition-colors ${
                activeTab === 'expertise' ? 'invisible' : ''
              }`}
            >
              Next
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-lg border border-[#2A69B5] text-[#2A69B5] hover:bg-[#2A69B5] hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`gradient-btn px-6 py-2 rounded-lg flex items-center gap-2 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
