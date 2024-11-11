import React from 'react'

import './PassResetCode.css'
import { IoIosArrowBack } from "react-icons/io";

function PassResetCode({setPage}) {
  return (
    <div className='pass-reset-code-container'>
      <div>
        <button onClick={()=>setPage(0)} className='back__btn'><IoIosArrowBack /></button>
      </div>
      <div className='logo_container text-center mb-5'>
        <div>CyberSphere</div>
      </div>
      <div>
        <div className= 'mb-4'>
          <div className='page-name'>Reset password</div>
          <div>Enter the code sent to you to verify your identity</div>
        </div>
        <div>
          <input className='w-100'></input>
          <div className='timer'>

          </div>
        </div>
        <div className='mt-4'>
          <button className='main_btn disabeld_btn w-50'>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default PassResetCode