import React, { useState } from 'react'
import SignupMain from '../../../Components/Authentication/SignupMain/SignupMain'
import CreatAcc from '../../../Components/Authentication/CreatAcc/CreatAcc'

function SignUp() {
  const [currentPage, setCurrentPage] = useState(0)
  
  return (
    <div className="h-screen">
      <div className="flex flex-col md:flex-row h-full m-0">
        {/* Left section with image */}
        <div className="md:w-1/2 w-full flex justify-center items-center p-5 relative">
          <img src="1.png" className="w-full h-full object-cover absolute" alt="Authentication" />
          <div className="flex flex-col p-5 gap-5 relative z-10">
            <div className="text-2xl font-bold">
              <div>CyberSphere</div>
            </div>
            <div>
              <div className="text-xl font-semibold mb-3">sign up in now</div>
              <p>
                Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Right section with form */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-5">
          {currentPage === 0 ? 
            <SignupMain setPage={setCurrentPage} /> : 
            <CreatAcc />
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp