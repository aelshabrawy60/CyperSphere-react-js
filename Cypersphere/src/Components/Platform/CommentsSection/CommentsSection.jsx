import Comment from '../Comment/Comment';
import React, { useState } from 'react';
import {Send, ChevronDown, ChevronUp } from 'lucide-react';

// Comments Section Component
const CommentsSection = ({ comments, postId }) => {
    const [newComment, setNewComment] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    
    // Display only 2 comments if not showing all
    const displayedComments = showAllComments ? comments : comments.slice(0, 2);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim()) {
        // In a real app, you would dispatch an action or call an API
        console.log(`Adding comment to post ${postId}: ${newComment}`);
        setNewComment('');
      }
    };
    
    return (
      <div className="mt-3">
        {comments.length > 2 && (
          <button 
            className="flex items-center text-blue-400 text-sm mb-3 hover:underline"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                Hide Comments
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                View All {comments.length} Comments
              </>
            )}
          </button>
        )}
        
        {displayedComments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center mt-3">
          <img 
            src="/api/placeholder/32/32" 
            alt="Your profile" 
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <div className="flex-1 relative">
            <input 
              type="text" 
              className="bg-gray-700 text-gray-200 rounded-full py-2 pl-4 pr-10 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" 
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-500 transition-colors disabled:text-gray-500"
              disabled={!newComment.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default CommentsSection