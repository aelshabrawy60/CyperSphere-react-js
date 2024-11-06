import React from 'react'

import './CreatAcc.css'
import SignupForm from '../SignupForm/SignupForm'
import ThirdPartyAuth from '../ThirdPartyAuth/ThirdPartYAuth'

function CreatAcc() {
  return (
    <div className='creat-acc-contianer'>
      <SignupForm/>
      <div className='line__seprator'></div>
      <ThirdPartyAuth/>
    </div>
  )
}

export default CreatAcc