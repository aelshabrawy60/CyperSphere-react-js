import React, { useEffect, useState } from 'react'
import Job from '../Job/Job'

function JobsViewer() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('https://jobs-api-arregator.vercel.app/api/jobs');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.jobs;
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        return [];
      }
    }
    
    fetchJobs()
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
    console.log(jobs)
  }, [])

  useEffect(()=>{
      console.log(jobs)
  },[jobs])

  if (isLoading) {
    return (
      <div className='bg-[#1D1D1F] rounded-lg p-3'>
        <div className='px-1 mb-2'>
          <h5 className='font-bold'>Jobs</h5>
        </div>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <div className='bg-[#1D1D1F] rounded-lg p-3 h-screen overflow-y-scroll no-scroll-bar'>
      <div className='px-1 mb-2 flex flex-col md:flex-row gap-4 md:items-center md:justify-between'>
        <h5 className='font-bold'>Jobs</h5>
      </div>
      <div className='flex flex-col gap-3'>
        {jobs.map((job, index) => (
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
      </div>
    </div>
  )
}

export default JobsViewer
