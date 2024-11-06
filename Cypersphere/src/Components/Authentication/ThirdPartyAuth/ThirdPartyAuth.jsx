import React from 'react'

import './ThirdPartyAuth.css'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

function ThirdPartyAuth() {
  return (
    <div className='thid-party-auth-container'>
        <div className='google-auth d-flex gap-3 align-items-center'>
            <FcGoogle />
            <div>Continue with Google</div>
        </div>
        <div className='facebook-auth d-flex gap-3 align-items-center'>
            <FaFacebook />
            <div>Continue with Facebook</div>
        </div>
    </div>
  )
}

export default ThirdPartyAuth