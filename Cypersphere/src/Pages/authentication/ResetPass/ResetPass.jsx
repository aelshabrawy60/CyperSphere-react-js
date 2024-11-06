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
          <div className='col-md-6 col-12 authImg-container'>
              <img src='img.png' className='authImg'></img>
              <div className='authImg__text'>
                  <div className='auth__logo'>

                  </div>
                  <div className='authImg__desc'>
                      <div>Forget Password</div>
                      <p>
                          Sign up now to access courses, connect with a community, find job opportunities, and tackle exciting challenges.
                      </p>
                  </div>
              </div>
          </div>
          <div className='col-md-6 col-12'>
              {pages[currentPage]}
          </div>
        </div>
    </div>
  )
}

export default ResetPass