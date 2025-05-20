import React, { useState } from 'react';
import { Image, Video, SmilePlus } from 'lucide-react';

const CreatePostCard = ({ groupId = 1 }) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem('authToken');

  const handlePostSubmit = async () => {
    if (!text && !photo && !video) return;

    const formData = new FormData();
    formData.append('text', text);
    if (photo) formData.append('photo', photo);
    if (video) formData.append('video', video);

    setLoading(true);

    try {
      const response = await fetch(`https://cybersphere7.runasp.net/api/Group/${groupId}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setText('');
      setPhoto(null);
      setVideo(null);
      alert('Post created successfully!');
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <img
          src="/api/placeholder/40/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-700 text-gray-200 rounded-full py-2 px-4 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          placeholder="What's on your mind?"
        />
      </div>

      <div className="flex justify-between mt-4 px-2">
        <label className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-gray-700 cursor-pointer">
          <Image size={18} className="mr-2" />
          <span>Photo</span>
          <input type="file" accept="image/*" hidden onChange={(e) => setPhoto(e.target.files[0])} />
        </label>

        <label className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-gray-700 cursor-pointer">
          <Video size={18} className="mr-2" />
          <span>Video</span>
          <input type="file" accept="video/*" hidden onChange={(e) => setVideo(e.target.files[0])} />
        </label>

        <button className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-gray-700" disabled>
          <SmilePlus size={18} className="mr-2" />
          <span>Feeling</span>
        </button>
      </div>

      <button
        onClick={handlePostSubmit}
        disabled={loading}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default CreatePostCard;
