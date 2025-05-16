import React from 'react'
import ThirdPartyAuth from '../ThirdPartyAuth/ThirdPartyAuth.jsx'
import { Link } from 'react-router-dom'

function SignupMain({setPage}) {
  return (
    <div className="max-w-lg text-center mx-auto">
      <h1 className="text-4xl font-medium capitalize mb-2">
        Join us to start your journey in cybersecurity
      </h1>
      
      <div className="text-base text-gray-500 mb-5">
        Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
      </div>
      
      <ThirdPartyAuth/>
      
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      
      <div className="mb-4">
        <button 
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-3"
          onClick={() => setPage(1)}
        >
          Create new account
        </button>
        
        <div className="text-xs text-gray-500">
          By signing up, you agree to the Terms of Service and Privacy Policy, including cookie use.
        </div>
      </div>
      
      <div className="text-left text-xs">
        Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Sign In</Link>
      </div>
    </div>
  )
}

export default SignupMain