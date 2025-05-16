import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"

function ThirdPartyAuth() {
  return (
    <div className="flex flex-col gap-3">
      <button className="flex items-center justify-center gap-3 border border-gray-700 rounded-full py-3 px-4 text-lg cursor-pointer hover:bg-gray-800 transition-colors">
        <FcGoogle className="text-xl" />
        <span>Continue with Google</span>
      </button>
      
      <button className="flex items-center justify-center gap-3 border border-gray-700 rounded-full py-3 px-4 text-lg cursor-pointer hover:bg-gray-800 transition-colors">
        <FaFacebook className="text-xl text-blue-600" />
        <span>Continue with Facebook</span>
      </button>
    </div>
  )
}

export default ThirdPartyAuth