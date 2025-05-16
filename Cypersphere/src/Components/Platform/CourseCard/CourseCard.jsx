import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/academy/learning-path/course/${data.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent navigation

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert("No auth token found.");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete "${data.title}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://cybersphere7.runasp.net/api/Course?id=${data.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': '*/*',
        },
      });

      if (response.ok) {
        alert("Deleted successfully.");
        // Optionally: refresh or update parent state
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div
      onClick={handleClick}
      className="relative w-full p-4 bg-gray-700 cursor-pointer rounded-lg"
    >
      <div>{data.title}</div>
      <div>{data.description}</div>

      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default CourseCard;
