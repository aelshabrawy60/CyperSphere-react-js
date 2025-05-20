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

const EditProfile = ({ profile, onSave, onCancel, studentId }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    firstName: profile.name?.split(' ')[0] || '',
    lastName: profile.name?.split(' ')[1] || '',
    userName: profile.userName || '',
    email: profile.email || '',
    phoneNumber: profile.phone || '',
    age: profile.age || 0,
    address: profile.location || '',
    about: profile.bio || '',
    profilePictureURL: profile.profilePictureURL || '',
    skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
    certifications: Array.isArray(profile.certifications) ? profile.certifications.join(', ') : ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    // Calculate form progress
    // Skip calculated fields and only count actual form fields that will be sent to API
    const apiFields = ['firstName', 'lastName', 'userName', 'email', 'phoneNumber', 'age', 'address', 'about'];
    const filledFields = apiFields.filter(field => {
      const value = formData[field];
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'number') return value > 0;
      return value !== null && value !== undefined;
    }).length;
    
    setProgress((filledFields / apiFields.length) * 100);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.about && formData.about.length > 500) {
      newErrors.about = 'Bio must be less than 500 characters';
    }
    if (formData.age && (isNaN(formData.age) || formData.age < 0 || formData.age > 120)) {
      newErrors.age = 'Please enter a valid age (0-120)';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle age as number
    if (name === 'age') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : parseInt(value, 10) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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
    setApiError(null);
    
    try {
      // Get auth token from local storage
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      // Create FormData object for the multipart/form-data request
      const submitData = new FormData();
      submitData.append('FirstName', formData.firstName);
      submitData.append('LastName', formData.lastName);
      submitData.append('UserName', formData.userName);
      submitData.append('Email', formData.email);
      submitData.append('PhoneNumber', formData.phoneNumber);
      submitData.append('Age', formData.age || 0);
      submitData.append('Address', formData.address);
      submitData.append('About', formData.about);
      submitData.append('ProfilePictureURL', formData.profilePictureURL);
      
      // Only append the file if one was selected
      if (imageFile) {
        submitData.append('ImageFile', imageFile);
      }
            
      // Make the API request
      const response = await fetch(`https://cybersphere7.runasp.net/api/Student/${studentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: submitData
      });
      
      console.log("response", response)
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Your session may have expired. Please log in again.');
        }
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      // Transform the data back to the format expected by the parent component
      const updatedProfile = {
        ...profile,
        name: `${formData.firstName} ${formData.lastName}`.trim() || profile.name,
        userName: formData.userName,
        email: formData.email,
        phone: formData.phoneNumber,
        age: formData.age,
        location: formData.address,
        bio: formData.about,
        profilePictureURL: formData.profilePictureURL,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
        certifications: formData.certifications.split(',').map(cert => cert.trim()).filter(Boolean)
      };
      
      // Call the onSave callback with the updated profile
      onSave(updatedProfile);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#111111] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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

        {apiError && (
          <div className="mb-4 bg-red-900 bg-opacity-20 text-red-500 p-3 rounded-lg">
            {apiError}
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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
        </div>

        <form onSubmit={handleSubmit} className="min-h-[400px]">
          {activeTab === 'basic' && (
            <div className="bg-[#1A1A1A] p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-[#2A69B5]">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`main-input ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`main-input ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="Username"
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
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label className="block mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="120"
                  className={`main-input ${errors.age ? 'border-red-500' : ''}`}
                  placeholder="Your age"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Location/Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="main-input"
                  placeholder="City, Country or Full Address"
                />
              </div>
              
              <div>
                <label className="block mb-2">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="main-input py-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Upload a new profile picture (optional)
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-[#1A1A1A] p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-[#2A69B5]">About You</h3>
              
              <div>
                <label className="block mb-2">Bio</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="8"
                  className={`main-input resize-none ${errors.about ? 'border-red-500' : ''}`}
                  placeholder="Tell us about yourself, your experience, and your interests..."
                />
                <div className="flex justify-between items-center mt-1">
                  <span className={`text-sm ${formData.about.length > 450 ? 'text-yellow-500' : 'text-gray-400'}`}>
                    {formData.about.length}/500 characters
                  </span>
                  {errors.about && (
                    <p className="text-red-500 text-sm">{errors.about}</p>
                  )}
                </div>
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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