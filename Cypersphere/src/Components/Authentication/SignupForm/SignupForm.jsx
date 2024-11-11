import React from 'react'

import './SignupForm.css'
import { Link } from 'react-router-dom';

function SignupForm() {
  return (
    <div className='signup-form-container'>
      <div className='page-name'>Create an account</div>
      <div>Already have an ccount? <Link to={'/signin'}>Log in </Link> </div>
      <form className='mt-4'>
        <div className='row m-0 row-gap-3'>
          <div className='d-flex col-6 p-0 pe-3 flex-column'>
            <label>First name</label>
            <input />
          </div>
          <div className='d-flex col-6 p-0 flex-column'>
            <label>Last name</label>
            <input />
          </div>
          <div className='d-flex col-12 p-0 flex-column'>
            <label>Email address</label>
            <input />
          </div>
          <div className='d-flex col-6 p-0 pe-3 flex-column'>
            <label>Password</label>
            <input />
          </div>
          <div className='d-flex col-6 p-0 flex-column'>
            <label>Confirm your password</label>
            <input />
          </div>
        </div>
        <div className='small_text mt-2 mb-2'>Use 8 or more characters with a mix of letters, numbers & symbols</div>
        <div className='mb-3'>
          <input type='checkbox' id='show-password-check' className='me-2'/>
          <label for="show-password-check">Show password</label>
        </div>
        <button className='main_btn disabeld_btn w-50'>
          Create an account
        </button>
      </form>
    </div>
  )
}

export default SignupForm