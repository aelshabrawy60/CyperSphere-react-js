import React, { useState } from 'react'

import './SignUp.css'
import SignupMain from '../../../Components/Authentication/SignupMain/SignupMain'
import CreatAcc from '../../../Components/Authentication/CreatAcc/CreatAcc'

function SignUp() {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <div className='signup-container'>
        <div className='row m-0 h-100'>
          <div className='col-md-6 col-12 authImg-container d-flex justify-content-center align-items-center p-5'>
              <img src='1.png' className='authImg'></img>
              <div className='authImg__text d-flex flex-column p-5 gap-5'>
                  <div className='auth__logo'>
                      <div>CyberSphere</div>
                  </div>
                  <div className='authImg__desc'>
                      <div className='authImg__desc--header mb-3'>sign up in now</div>
                      <p>
                          Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
                      </p>
                  </div>
              </div>
          </div>
          <div className='col-md-6 col-12 d-flex flex-column justify-content-center align-items-center p-5'>
              {currentPage == 0 ? <SignupMain setPage={setCurrentPage}/>: <CreatAcc/>}
          </div>
        </div>
    </div>
  )
}

export default SignUp