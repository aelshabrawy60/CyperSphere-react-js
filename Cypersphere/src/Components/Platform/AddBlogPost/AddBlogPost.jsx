import React, { useState, useRef } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';

function AddBlogPost({onAdd}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    AuthorName: "",
    Content: "",
    Image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Prepare form data for submission
      const submitFormData = new FormData();
      submitFormData.append('Title', formData.Title);
      submitFormData.append('Description', formData.Description);
      submitFormData.append('Content', formData.Content);
      
      if (formData.AuthorName) {
        submitFormData.append('AuthorName', formData.AuthorName);
      }
      
      if (formData.Image) {
        submitFormData.append('Image', formData.Image);
      }
      
      if (fileInputRef.current && fileInputRef.current.files[0]) {
        submitFormData.append('ImageFile', fileInputRef.current.files[0]);
      }

      // Send request to the API
      const response = await fetch('https://cybersphere7.runasp.net/api/Article/create-article', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: submitFormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create blog post");
      }

      // Success handling
      setSuccess(true);
      resetForm();

      
      // Close modal after a short delay
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 500);
      onAdd()
      
    } catch (err) {
      setError(err.message || "An error occurred while creating the blog post");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Title: "",
      Description: "",
      AuthorName: "",
      Content: "",
      Image: "",
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="font-sans">
      {/* Button to open modal */}
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition-colors"
      >
        Create New Blog Post
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal Content */}
          <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Create New Blog Post</h2>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              {error && (
                <div className="mb-4 p-3 bg-red-900/40 border border-red-800 text-red-200 rounded-md">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-900/40 border border-green-800 text-green-200 rounded-md">
                  Blog post created successfully!
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={formData.Title}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  ></textarea>
                </div>

                {/* Author Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="AuthorName"
                    value={formData.AuthorName}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="Content"
                    value={formData.Content}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  ></textarea>
                </div>

                {/* Image URL */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="Image"
                    value={formData.Image}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Image File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Upload Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md cursor-pointer transition-colors">
                      <Upload size={16} />
                      <span>Choose File</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="absolute top-0 right-0 bg-black bg-opacity-60 p-1 rounded-bl-md"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 ${
                      loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white rounded-md shadow transition-colors flex items-center gap-2`}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Creating...
                      </>
                    ) : 'Create Blog Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBlogPost;