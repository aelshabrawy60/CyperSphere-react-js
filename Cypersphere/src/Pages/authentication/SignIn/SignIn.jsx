import React from 'react'

import './SignIn.css'
import SigninForm from '../../../Components/Authentication/SigninForm/SigninForm'
import ThirdPartyAuth from '../../../Components/Authentication/ThirdPartyAuth/ThirdPartyAuth.jsx'

function SignIn() {
  return (
    <div className='signin-container'>
        <div className='row m-0 h-100'>
          <div className='col-md-6 col-12 authImg-container d-flex justify-content-center align-items-center p-5'>
              <img src='1.png' className='authImg'></img>
              <div className='authImg__text d-flex flex-column p-5 gap-5'>
                  <div className='auth__logo'>
                      <div>CyberSphere</div>
                  </div>
                  <div className='authImg__desc'>
                      <div className='authImg__desc--header mb-3'>Log in now</div>
                      <p>
                        to explore a comprehensive cybersecurity learning path, connect with a vibrant community, and discover job opportunities and challenges to boost your skills.
                      </p>
                  </div>
              </div>
          </div>
          <div className='col-md-6 col-12 d-flex flex-column justify-content-center p-5'>
              <div className='mx-4'>
                <SigninForm/>
                <div className='line__seprator mb-4'>
                    <div></div>OR<div></div>
                </div>
                <ThirdPartyAuth/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default SignIn