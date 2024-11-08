import React from 'react'

import './SignupMain.css'
import ThirdPartyAuth from '../ThirdPartyAuth/ThirdPartYAuth'
import { Link } from 'react-router-dom';

function SignupMain({setPage}) {
  return (
    <div className='signup-main-container'>
        <div>
          Join us to start your journey in cybersecurity
        </div>
        <div>
          Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
        </div>
        <ThirdPartyAuth/>
        <div className='line__seprator'></div>
        <div>
          <button onClick={()=>setPage(1)}>Create new account</button>
          <div>By signing up, you agree to the Terms of Service and Privacy Policy, including cookie use.</div>
        </div>
        <div>
          Already have an acount? <Link to={'/signin'}>Sign In</Link>  
        </div>
    </div>
  )
}

export default SignupMain