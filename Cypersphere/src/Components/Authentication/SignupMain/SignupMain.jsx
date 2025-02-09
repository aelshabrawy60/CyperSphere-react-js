import React from 'react'

import './SignupMain.css'
import ThirdPartyAuth from '../ThirdPartyAuth/ThirdPartyAuth.jsx'
import { Link } from 'react-router-dom';

function SignupMain({setPage}) {
  return (
    <div className='signup-main-container text-center'>
        <div className='sign-up-main__header mb-2'>
          Join us to start your journey in cybersecurity
        </div>
        <div className='sign-up-main__subtitle mb-5'>
          Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
        </div>
        <ThirdPartyAuth/>
        <div className='line__seprator mb-4 mt-4'>
            <div></div>OR<div></div>
        </div>
        <div className='mb-4'>
          <button className='main_btn w-100 mb-3' onClick={()=>setPage(1)}>Create new account</button>
          <div className='small_text'>By signing up, you agree to the Terms of Service and Privacy Policy, including cookie use.</div>
        </div>
        <div className='text-start small_text'>
          Already have an acount? <Link to={'/signin'}>Sign In</Link>  
        </div>
    </div>
  )
}

export default SignupMain