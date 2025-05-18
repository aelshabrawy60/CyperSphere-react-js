import React from 'react'
import LatestArticle from '../../../Components/Platform/LatestArticle/LatestArticle'
import TrendingBooks from '../../../Components/Platform/TrendingBooks/TrendingBooks'
import LatestJobs from '../../../Components/Platform/LatestJobs/LatestJobs'

function Home() {
  return (
    <div className='px-4'>
      <div className='flex gap-5 mb-5'>
        <div className='w-full'>
          <LatestJobs/>
        </div>
        <div className='min-w-[350px] flex flex-col gap-5'>
          <TrendingBooks/>
          <LatestArticle/>
        </div>
      </div>
      
    </div>
  )
}

export default Home