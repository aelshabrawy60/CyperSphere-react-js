import React, { useEffect, useState } from 'react'
import './JobsViewer.css'
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
      <div className='jobs-viewer-container p-3'>
        <div className='jobs-viewer-header px-1 mb-2'>
          <h5 className='jobs-viewer-header--title fw-bold'>Jobs</h5>
        </div>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='jobs-viewer-container p-3'>
      <div className='jobs-viewer-header px-1 mb-2 d-flex flex-column flex-md-row gap-4 align-items-md-center justify-content-md-between'>
        <h5 className='jobs-viewer-header--title fw-bold'>Jobs</h5>
      </div>
      <div className='viewer-container d-flex flex-column gap-3'>
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