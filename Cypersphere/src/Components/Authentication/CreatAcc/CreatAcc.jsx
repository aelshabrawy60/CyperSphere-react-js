import React from 'react'

import './CreatAcc.css'
import SignupForm from '../SignupForm/SignupForm'
import ThirdPartyAuth from '../ThirdPartyAuth/ThirdPartyAuth.jsx'

function CreatAcc() {
  return (
    <div className='creat-acc-contianer'>
      <SignupForm/>
      <div className='line__seprator mb-4 mt-4'>
          <div></div>OR<div></div>
      </div>
      <ThirdPartyAuth/>
    </div>
  )
}

export default CreatAcc