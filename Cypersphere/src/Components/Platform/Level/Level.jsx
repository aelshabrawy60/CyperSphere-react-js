import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Check, X, ChevronRight } from 'lucide-react';

function Level({ data, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });

  const handleClick = () => {
    if (!isEditing) {
      navigate(`/academy/learning-path/level/${data.id}`);
    }
  };

  const showFeedback = (message, type) => {
    setFeedback({ show: true, message, type });
    setTimeout(() => setFeedback({ show: false, message: '', type: '' }), 3000);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      showFeedback("No auth token found.", "error");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete "${data.title}"?`);
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`https://cybersphere7.runasp.net/api/Level?id=${data.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': '*/*',
        },
      });

      if (response.ok) {
        showFeedback("Level deleted successfully", "success");
        if (onDelete) onDelete(data.id);
      } else {
        showFeedback("Failed to delete level", "error");
      }
    } catch (err) {
      console.error(err);
      showFeedback("An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setTitle(data.title);
    setDescription(data.description);
  };

  const handleSave = async (e) => {
    e.stopPropagation();

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      showFeedback("No auth token found", "error");
      return;
    }

    if (!title.trim()) {
      showFeedback("Title cannot be empty", "error");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('Title', title);
      formData.append('Description', description);
      formData.append('ParentLevelId', ''); // If needed, adjust or remove

      const response = await fetch(`https://cybersphere7.runasp.net/api/Level/${data.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': '*/*',
        },
        body: formData,
      });

      if (response.ok) {
        showFeedback("Level updated successfully", "success");
        setIsEditing(false);
        if (onUpdate) onUpdate({ ...data, title, description });
      } else {
        showFeedback("Failed to update level", "error");
      }
    } catch (err) {
      console.error(err);
      showFeedback("An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="relative mb-4 group">
      {/* Feedback Toast */}
      {feedback.show && (
        <div 
          className={`absolute top-0 right-0 z-10 px-4 py-2 rounded-md text-sm font-medium transform -translate-y-full
            ${feedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {feedback.message}
        </div>
      )}
      
      <div
        onClick={handleClick}
        className={`relative h-[150px] py-6 px-8 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg 
          shadow-md transition-all duration-200 ${!isEditing ? 'cursor-pointer hover:shadow-lg' : ''} 
          ${loading ? 'opacity-70' : ''}`}
      >
        {isEditing ? (
          <div className="flex flex-col space-y-3" onClick={e => e.stopPropagation()}>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                disabled={loading}
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center bg-blue-600 px-4 py-2 rounded transition-colors hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                <Check size={16} className="mr-1" />
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center bg-gray-600 px-4 py-2 rounded transition-colors hover:bg-gray-700 disabled:opacity-50 text-sm font-medium"
              >
                <X size={16} className="mr-1" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
            <p className="text-gray-300 text-sm max-w-[400px]">{description}</p>
            <ChevronRight 
              size={20} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors" 
            />
          </>
        )}

        {isAdmin && !isEditing && (
          <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEditClick}
              className="flex items-center justify-center bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-l transition-colors"
              aria-label="Edit level"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center bg-gray-700 hover:bg-red-600 text-white p-2 rounded-r transition-colors"
              aria-label="Delete level"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Level;