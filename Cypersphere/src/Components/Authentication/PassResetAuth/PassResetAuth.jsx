import React from 'react'
import {Link} from 'react-router-dom'
import './PassResetAuth.css'
import { IoIosArrowBack } from "react-icons/io";

function PassResetAuth() {
  return (
    <div className='pass-reset-auth-container'>
      <div>
        <Link to={'/signin'}><button className='back__btn'><IoIosArrowBack /></button></Link>
      </div>
      <div className='logo_container text-center mb-5'>
          <div>CyberSphere</div>
      </div>
      <div>
        <div className='mb-4'>
          <div className='page-name'>Reset password</div>
          <div>We need to confirm your identity to update your password</div>
        </div>
        <form>
          <div className='d-flex flex-column'>
            <label>email address</label>
            <input />
          </div>
          <div className='mt-4'>
            <button className='main_btn disabeld_btn w-50'>Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PassResetAuth