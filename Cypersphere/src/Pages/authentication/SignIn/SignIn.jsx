import React from 'react'

import './SignIn.css'
import SigninForm from '../../../Components/Authentication/SigninForm/SigninForm'
import ThirdPartyAuth from '../../../Components/Authentication/ThirdPartyAuth/ThirdPartYAuth'

function SignIn() {
  return (
    <div className='signin-container'>
        <div className='row m-0 h-100'>
          <div className='col-md-6 col-12 authImg-container'>
              <img src='img.png' className='authImg'></img>
              <div className='authImg__text'>
                  <div className='auth__logo'>

                  </div>
                  <div className='authImg__desc'>
                      <div>Log in now</div>
                      <p>
                        to explore a comprehensive cybersecurity learning path, connect with a vibrant community, and discover job opportunities and challenges to boost your skills.
                      </p>
                  </div>
              </div>
          </div>
          <div className='col-md-6 col-12'>
              <SigninForm/>
              <div className='line__seprator'>
                  <hr></hr>
              </div>
              <ThirdPartyAuth/>
          </div>
        </div>
    </div>
  )
}

export default SignIn