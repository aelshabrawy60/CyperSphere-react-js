import React from 'react'
import LatestArticle from '../../../Components/Platform/LatestArticle/LatestArticle'
import TrendingBooks from '../../../Components/Platform/TrendingBooks/TrendingBooks'
import LatestJobs from '../../../Components/Platform/LatestJobs/LatestJobs'

function Home() {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col lg:flex-row gap-5 mb-5'>
        {/* Main content - takes full width on mobile, grows on desktop */}
        <div className='w-full lg:flex-1'>
          <LatestJobs/>
        </div>
        
        {/* Sidebar - stacks below main content on mobile, fixed width on desktop */}
        <div className='w-full lg:min-w-[350px] lg:w-[350px] flex flex-col gap-5'>
          <TrendingBooks/>
          <LatestArticle/>
        </div>
      </div>
    </div>
  )
}

export default Home