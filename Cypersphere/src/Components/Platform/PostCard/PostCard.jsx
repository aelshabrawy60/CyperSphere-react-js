import React, { useState } from 'react';
import { Image, Video, SmilePlus, Clock, MoreHorizontal, ThumbsUp, MessageSquare } from 'lucide-react';
import CommentsSection from '../CommentsSection/CommentsSection';

// Post Component
const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(post.likedByMe);
    const [showComments, setShowComments] = useState(false);
    
    const toggleComments = () => {
      setShowComments(!showComments);
    };
    
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
        {/* Post Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/api/placeholder/40/40" 
              alt={`${post.author} profile`} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h3 className="font-semibold text-gray-100">{post.author}</h3>
              <div className="flex items-center text-xs text-gray-400">
                <span>{post.timeAgo}</span>
                <Clock size={12} className="ml-1" />
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-200 rounded-full p-1 hover:bg-gray-700 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        {/* Post Content */}
        <p className="my-3 text-gray-200 leading-relaxed">{post.content}</p>
        
        {post.image && (
          <div className="mt-2 mb-3 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post attachment" 
              className="w-full object-cover"
            />
          </div>
        )}
        
        {/* Engagement Stats */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <div className="flex items-center text-gray-300">
            <span className="inline-flex justify-center items-center w-5 h-5 bg-blue-500 rounded-full mr-2">
              <ThumbsUp size={12} className="text-white" />
            </span>
            <span>{post.likedByMe ? 'You and ' : ''}{post.likeCount} others</span>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-200 transition-colors"
            onClick={toggleComments}
          >
            {post.comments.length} Comments
          </button>
        </div>
        
        <div className="h-px bg-gray-700 my-3"></div>
        
        {/* Action Buttons */}
        <div className="flex justify-around">
          <button 
            className={`flex items-center justify-center py-1 px-3 rounded-md transition-colors ${
              liked ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
            }`}
            onClick={() => setLiked(!liked)}
          >
            <ThumbsUp size={18} className="mr-2" />
            <span>Like</span>
          </button>
          <button 
            className="flex items-center justify-center py-1 px-3 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors"
            onClick={toggleComments}
          >
            <MessageSquare size={18} className="mr-2" />
            <span>Comment</span>
          </button>
        </div>
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <CommentsSection comments={post.comments} postId={post.id} />
          </div>
        )}
      </div>
    );
  };

  export default PostCard