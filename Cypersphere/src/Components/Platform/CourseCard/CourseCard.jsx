import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Book, Clock } from 'lucide-react';

function CourseCard({ data, onDelete }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });

  const handleClick = () => {
    if (!loading) {
      navigate(`/academy/learning-path/course/${data.id}`);
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
      showFeedback("No auth token found", "error");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete "${data.title}"?`);
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`https://cybersphere7.runasp.net/api/Course?id=${data.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': '*/*',
        },
      });

      if (response.ok) {
        showFeedback("Course deleted successfully", "success");
        if (onDelete) onDelete(data.id);
      } else {
        showFeedback("Failed to delete course", "error");
      }
    } catch (err) {
      console.error(err);
      showFeedback("An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  // Extract estimated duration or use placeholder
  const duration = data.estimatedDuration || 'mins';
  
  // Determine completion status if available
  const isCompleted = data.isCompleted || false;

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
        className={`relative overflow-hidden w-full p-6 bg-gray-800 border border-gray-700 
          rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:border-gray-600
          ${loading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
      >
        {/* Status indicator - left border */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 
          ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
        />
        
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-white">{data.title}</h3>
            
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{duration}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-2">{data.description}</p>
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center text-sm text-gray-400">
              <Book size={14} className="mr-1" />
              <span>Course</span>
            </div>
            
            <div className="text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">
              <span className="text-sm mr-1">View course</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center justify-center bg-gray-700 hover:bg-red-600 text-white p-2 rounded transition-colors"
              aria-label="Delete course"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
        
        {/* Completion badge */}
        {isCompleted && (
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl">
            Completed
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;