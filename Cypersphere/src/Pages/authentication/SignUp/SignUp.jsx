import React, { useState } from 'react'

import './SignUp.css'
import SignupMain from '../../../Components/Authentication/SignupMain/SignupMain'
import CreatAcc from '../../../Components/Authentication/CreatAcc/CreatAcc'

function SignUp() {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <div className='signup-container'>
        <div className='row m-0 h-100'>
          <div className='col-md-6 col-12 authImg-container'>
              <img src='img.png' className='authImg'></img>
              <div className='authImg__text'>
                  <div className='auth__logo'>

                  </div>
                  <div className='authImg__desc'>
                      <div>sign up in now</div>
                      <p>
                          Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
                      </p>
                  </div>
              </div>
          </div>
          <div className='col-md-6 col-12'>
              {currentPage == 0 ? <SignupMain setPage={setCurrentPage}/>: <CreatAcc/>}
          </div>
        </div>
    </div>
  )
}

export default SignUp