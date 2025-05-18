import React, { useEffect, useState } from 'react';
import Job from '../Job/Job';

function LatestJobs() {
  const [latestJobs, setLatestJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLatestJobs() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('https://jobs-api-arregator.vercel.app/api/jobs');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Get only the 3 most recent jobs
        const recentJobs = data.jobs.slice(0, 5);
        setLatestJobs(recentJobs);
      } catch (error) {
        console.error('Failed to fetch latest jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchLatestJobs();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-gray-800 rounded-lg p-3 flex">
          <div className="rounded-full bg-gray-700 h-12 w-12 mr-3"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorDisplay = ({ message }) => (
    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-center">
      <svg className="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p className="text-red-300">{message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md text-sm"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="bg-[#1D1D1F] rounded-lg p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg 
            className="w-5 h-5 text-blue-500 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <h2 className="text-lg font-bold text-white">Latest Jobs</h2>
        </div>
        <a 
          href="/jobs" 
          className="text-blue-500 hover:text-blue-400 text-sm flex items-center"
        >
          View All
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : latestJobs.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <svg 
            className="w-10 h-10 mx-auto mb-2 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p>No jobs available at the moment</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {latestJobs.map((job, index) => (
            <Job 
              key={index} 
              agoTime={job.datePosted} 
              title={job.title} 
              description={job.company} 
              jobLogo={job.jobLogo} 
              location={job.location} 
              link={job.link} 
            />
          ))}
          
          <a 
            href="/jobs" 
            className="text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm mt-2 transition duration-150"
          >
            See More Jobs
          </a>
        </div>
      )}
    </div>
  );
}

export default LatestJobs;