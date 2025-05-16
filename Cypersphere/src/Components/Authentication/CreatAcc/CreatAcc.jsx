import React from 'react'
import SignupForm from '../SignupForm/SignupForm'
import ThirdPartyAuth from '../ThirdPartyAuth/ThirdPartyAuth.jsx'

function CreatAcc() {
  return (
    <div className="w-full max-w-md mx-auto">
      <SignupForm />
      
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      
      <ThirdPartyAuth />
    </div>
  )
}

export default CreatAcc