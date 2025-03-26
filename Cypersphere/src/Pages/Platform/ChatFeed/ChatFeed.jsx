import React, { useState } from 'react';
import { Image, Video, SmilePlus, Clock, MoreHorizontal, ThumbsUp, MessageSquare } from 'lucide-react';
import PostCard from '../../../Components/Platform/PostCard/PostCard';
import CreatePostCard from '../../../Components/Platform/CreatePostCard/CreatePostCard';


// Feed Component (Main Component)
const ChatFeed = () => {
    const posts = [
      {
        id: 1,
        author: "John Doe",
        timeAgo: "2h ago",
        content: "This is a sample post description with some text content.",
        image: "/api/placeholder/600/400",
        likeCount: 120,
        commentCount: 50,
        likedByMe: true,
        comments: [
          { id: 101, author: "Sarah Johnson", content: "Great post! Thanks for sharing this.", timeAgo: "1h ago" },
          { id: 102, author: "Mike Chen", content: "I completely agree with your points here.", timeAgo: "45m ago" },
          { id: 103, author: "Emma Watson", content: "This is exactly what I needed to hear today!", timeAgo: "30m ago" },
          { id: 104, author: "David Miller", content: "Could you elaborate more on the second point?", timeAgo: "15m ago" }
        ]
      },
      {
        id: 2,
        author: "Samia Nabil",
        timeAgo: "30 min ago",
        content: "This is a sample post description with some text content. This is a sample post description with some text content. This is a sample post description with some text content. This is a sample post description with some text content. This is a sample post description with some text content.",
        image: null,
        likeCount: 100,
        commentCount: 90,
        likedByMe: true,
        comments: [
          { id: 201, author: "Alex Russo", content: "I've been thinking about this too!", timeAgo: "25m ago" },
          { id: 202, author: "Taylor Swift", content: "Such an important topic. Thanks for bringing this up.", timeAgo: "20m ago" },
          { id: 203, author: "Chris Evans", content: "Well articulated!", timeAgo: "10m ago" }
        ]
      }
    ];
  
    return (
      <div className="min-h-screen bg-gray-900 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <CreatePostCard />
          
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  };
  
  export default ChatFeed;