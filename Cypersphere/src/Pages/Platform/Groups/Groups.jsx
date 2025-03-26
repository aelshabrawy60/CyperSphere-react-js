import React from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatGroups = () => {
  const chatGroups = [
    {
      id: 1,
      title: "Essentials",
      description: "Private Group",
      imagePath: "/api/placeholder/400/300",
      alt: "Essentials Group"
    },
    {
      id: 2,
      title: "Red Team",
      description: "Advanced Security Discussions",
      imagePath: "/api/placeholder/400/300",
      alt: "Red Team"
    },
    {
      id: 3,
      title: "Blue Team",
      description: "Cyber Defense Strategies",
      imagePath: "/api/placeholder/400/300",
      alt: "Blue Team"
    },
    {
      id: 4,
      title: "Network Security",
      description: "Public Group, Active 2h ago",
      imagePath: "/api/placeholder/400/300",
      alt: "Network Security"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Chat Groups
          </h1>
          <p className="text-gray-400">Join specialized cybersecurity discussion groups</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chatGroups.map((group) => (
            <Link to={'/chat_feed'} id={group.id}>
            <div 
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="relative">
                <img
                  src={group.imagePath}
                  alt={group.alt}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                  <span className="flex items-center text-xs text-gray-400">
                    <Users size={14} className="mr-1" />
                    24
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{group.description}</p>
                <button 
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium transition-all duration-300 hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Join Chat
                </button>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatGroups;