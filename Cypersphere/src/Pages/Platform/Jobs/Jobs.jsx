import React, { useState } from 'react'
import Job from '../../../Components/Platform/Job/Job'
import JobsViewer from '../../../Components/Platform/JobsViewer/JobsViewer'
import Company from '../../../Components/Platform/Company/Company'
import CompaniesViewer from '../../../Components/Platform/CompaniesViewer/CompaniesViewer'
import { FaBriefcase, FaBuilding } from 'react-icons/fa'

function Jobs() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-4 text-white px-5">
      {/* Enhanced Dark Mode Tabs for mobile view */}
      <div className="lg:hidden mx-4 mb-5">
        <div className="bg-[#2d2d2d] rounded-xl p-2 shadow-lg border border-[#404040]">
          <ul className="flex gap-2">
            <li className="flex-1">
              <button 
                className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 hover:bg-[#353535] group
                  ${activeTab === 'jobs' 
                    ? 'bg-[#3a86ff] text-white shadow-[0_2px_4px_rgba(58,134,255,0.2)]' 
                    : 'text-[#a0a0a0]'
                  }`}
                onClick={() => handleTabChange('jobs')}
                disabled={isLoading}
              >
                <FaBriefcase className="text-base" />
                <span>Jobs</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#404040] text-[#a0a0a0]">
                  42
                </span>
                {isLoading && activeTab === 'jobs' && (
                  <div className="ml-2 w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                )}
              </button>
            </li>
            <li className="flex-1">
              <button 
                className={`w-full px-3 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 hover:bg-[#353535] group
                  ${activeTab === 'companies' 
                    ? 'bg-[#3a86ff] text-white shadow-[0_2px_4px_rgba(58,134,255,0.2)]' 
                    : 'text-[#a0a0a0]'
                  }`}
                onClick={() => handleTabChange('companies')}
                disabled={isLoading}
              >
                <FaBuilding className="text-base" />
                <span>Companies</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#404040] text-[#a0a0a0]">
                  15
                </span>
                {isLoading && activeTab === 'companies' && (
                  <div className="ml-2 w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4 mx-0">
        <div className={`lg:col-span-8 ${
          activeTab === 'jobs' 
            ? 'block animate-[slideIn_0.3s_ease-out]' 
            : 'hidden lg:block'
        }`}>
          <JobsViewer/>
        </div>

        <div className={`lg:col-span-4 ${
          activeTab === 'companies' 
            ? 'block animate-[slideIn_0.3s_ease-out]' 
            : 'hidden lg:block'
        }`}>
          <CompaniesViewer/>
        </div>
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

export default Jobs
