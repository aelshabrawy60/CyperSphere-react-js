import React, { useState } from 'react';
import { Image, Video, SmilePlus, Clock, MoreHorizontal, ThumbsUp, MessageSquare } from 'lucide-react';

// Create Post Component
const CreatePostCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <img 
          src="/api/placeholder/40/40" 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <input 
          type="text" 
          className="bg-gray-700 text-gray-200 rounded-full py-2 px-4 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" 
          placeholder="What's on your mind?"
        />
      </div>
      
      <div className="flex justify-between mt-4 px-2">
        <button className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-gray-700">
          <Image size={18} className="mr-2" />
          <span>Photo</span>
        </button>
        <button className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-gray-700">
          <Video size={18} className="mr-2" />
          <span>Video</span>
        </button>
        <button className="flex items-center text-gray-300 hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-gray-700">
          <SmilePlus size={18} className="mr-2" />
          <span>Feeling</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard