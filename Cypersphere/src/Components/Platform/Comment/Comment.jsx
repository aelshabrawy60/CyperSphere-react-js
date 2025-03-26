import React, { useState } from 'react';
import { Image, Video, SmilePlus, Clock, MoreHorizontal, ThumbsUp, MessageSquare } from 'lucide-react';

// Comment Component
const Comment = ({ comment }) => {
    return (
      <div className="flex mb-3">
        <img 
          src="/api/placeholder/32/32" 
          alt={`${comment.author} profile`} 
          className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
        />
        <div className="flex-1">
          <div className="bg-gray-700 rounded-lg px-3 py-2">
            <div className="font-medium text-sm text-gray-200">{comment.author}</div>
            <p className="text-gray-300 text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center mt-1 text-xs text-gray-400 space-x-3 pl-2">
            <button className="hover:text-blue-400 transition-colors">Like</button>
            <button className="hover:text-blue-400 transition-colors">Reply</button>
            <span>{comment.timeAgo}</span>
          </div>
        </div>
      </div>
    );
  };

  export default Comment