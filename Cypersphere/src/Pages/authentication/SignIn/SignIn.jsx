import React from 'react'
import SigninForm from '../../../Components/Authentication/SigninForm/SigninForm'
import ThirdPartyAuth from '../../../Components/Authentication/ThirdPartyAuth/ThirdPartyAuth.jsx'

function SignIn() {
  return (
    <div className="h-screen">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left section with image */}
        <div className="md:w-1/2 w-full relative flex justify-center items-center p-5 text-white">
          <img 
            src="1.png" 
            className="absolute inset-0 w-full h-full object-cover -z-10"
            alt="Background"
          />
          <div className="flex flex-col p-5 gap-5 max-w-lg">
            <div className="font-bold text-5xl font-serif">
              <div>CyberSphere</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-3">Log in now</div>
              <p className="text-lg">
                to explore a comprehensive cybersecurity learning path, connect with a vibrant community, and discover job opportunities and challenges to boost your skills.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right section with form */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-5">
          <div className="mx-4">
            <SigninForm />
            
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            
            <ThirdPartyAuth />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn