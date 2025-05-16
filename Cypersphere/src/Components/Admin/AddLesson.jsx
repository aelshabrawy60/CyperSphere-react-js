import React, { useState } from 'react';

function AddLesson({ courseId, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoURL: '',
    courseId: courseId || 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update courseId in formData when prop changes
  React.useEffect(() => {
    setFormData(prev => ({ ...prev, courseId: courseId || 0 }));
  }, [courseId]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      title: '',
      description: '',
      videoURL: '',
      courseId: courseId || 0
    });
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'courseId' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Get auth token from local storage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('https://cybersphere7.runasp.net/api/Lesson/add-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        let errorMessage = 'Failed to add lesson';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `${response.status}: ${response.statusText || errorMessage}`;
        }
        throw new Error(errorMessage);
      }

      // Try to parse response if exists
      try {
        const result = await response.json();
        console.log('Lesson added:', result);
      } catch (e) {
        // Response may not contain JSON
        console.log('Lesson added successfully');
      }
      
      setSuccess('Lesson added successfully!');
      setFormData({
        title: '',
        description: '',
        videoURL: '',
        courseId: courseId || 0
      });
      
      // Call onSuccess callback if provided
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      
      // Close modal after 2 seconds on success
      setTimeout(() => {
        closeModal();
      }, 500);
    } catch (err) {
      console.error('Error adding lesson:', err);
      if (err.message.includes('blocked by CORS policy')) {
        setError('CORS error: The API server is not allowing requests from this origin. Please contact your administrator.');
      } else {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white">
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Add Lesson
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal content */}
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Add New Lesson</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter lesson title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter lesson description"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Video URL
              </label>
              <input
                type="text"
                name="videoURL"
                value={formData.videoURL}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter video URL"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-4 p-3 bg-green-900 text-green-200 rounded-md">
                {success}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddLesson;