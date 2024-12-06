import React, { useState } from 'react'

import './ResetPass.css'
import PassResetAuth from '../../../Components/Authentication/PassResetAuth/PassResetAuth'
import PassResetCode from '../../../Components/Authentication/PassResetCode/PassResetCode'
import PassResetNew from '../../../Components/Authentication/PassResetNew/PassResetNew'

function ResetPass() {

  const [currentPage, setCurrentPage] = useState(0)

  const pages = [<PassResetAuth />, <PassResetCode setPage={setCurrentPage}/>, <PassResetNew setPage={setCurrentPage}/>]


  return (
    <div className='reset-pass-container'>
        <div className='row m-0 h-100'>
          <div className='col-md-6 col-12 authImg-container d-flex justify-content-center align-items-center p-5'>
              <img src='1.png' className='authImg'></img>
              <div className='authImg__text d-flex flex-column p-5 gap-5'>
                  <div className='auth__logo'>
                      <div>CyberSphere</div>
                  </div>
                  <div className='authImg__desc'>
                      <div className='authImg__desc--header mb-3'>Forget Password</div>
                      <p>
                          Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
                      </p>
                  </div>
              </div>
          </div>
          <div className='col-md-6 col-12 d-flex flex-column p-5'>
              {pages[currentPage]}
          </div>
        </div>
    </div>
  )
}

export default ResetPass