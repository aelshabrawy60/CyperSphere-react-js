import React, { useState } from 'react'
import ToolsViewer from '../../../../Components/Platform/ToolsViewer/ToolsViewer'
import PlatformsViewer from '../../../../Components/Platform/PlatformsViewer/PlatformsViewer'
import { FaTools, FaGraduationCap } from 'react-icons/fa'

function Tools() {
  const [activeTab, setActiveTab] = useState('platforms');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-4 text-white px-5">
      {/* Enhanced Dark Mode Tabs */}
      <div className="mx-4 mb-5">
        <div className="bg-[#2d2d2d] rounded-xl p-2 shadow-lg border border-[#404040]">
          <ul className="flex gap-2">
            <li className="flex-1">
              <button 
                className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 hover:bg-[#353535] group
                  ${activeTab === 'tools' 
                    ? 'bg-[#3a86ff] text-white shadow-[0_2px_4px_rgba(58,134,255,0.2)]' 
                    : 'text-[#a0a0a0]'
                  }`}
                onClick={() => handleTabChange('tools')}
                disabled={isLoading}
              >
                <FaTools className="text-base" />
                <span>Tools</span>
                {isLoading && activeTab === 'tools' && (
                  <div className="ml-2 w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                )}
              </button>
            </li>
            <li className="flex-1">
              <button 
                className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 hover:bg-[#353535] group
                  ${activeTab === 'platforms' 
                    ? 'bg-[#3a86ff] text-white shadow-[0_2px_4px_rgba(58,134,255,0.2)]' 
                    : 'text-[#a0a0a0]'
                  }`}
                onClick={() => handleTabChange('platforms')}
                disabled={isLoading}
              >
                <FaGraduationCap className="text-base" />
                <span>Platforms</span>
                {isLoading && activeTab === 'platforms' && (
                  <div className="ml-2 w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mx-0">
        {activeTab === 'tools' ? (
          <div className="animate-[slideIn_0.3s_ease-out]">
            <ToolsViewer />
          </div>
        ) : (
          <div className="animate-[slideIn_0.3s_ease-out]">
            <PlatformsViewer />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Tools
