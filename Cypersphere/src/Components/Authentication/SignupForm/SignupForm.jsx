import React from 'react'

import './SignupForm.css'
import { Link } from 'react-router-dom';

function SignupForm() {
  return (
    <div className='signup-form-container'>
      <div>Create an account</div>
      <div>Already have an ccount? <Link to={'/signin'}>Log in </Link> </div>
      <form>
        <div className='row m-0'>
          <div className='d-flex col-6 flex-column'>
            <label>First name</label>
            <input />
          </div>
          <div className='d-flex col-6 flex-column'>
            <label>Last name</label>
            <input />
          </div>
          <div className='d-flex col-12 flex-column'>
            <label>Email address</label>
            <input />
          </div>
          <div className='d-flex col-6 flex-column'>
            <label>Password</label>
            <input />
          </div>
          <div className='d-flex col-6 flex-column'>
            <label>Confirm your password</label>
            <input />
          </div>
        </div>
        <div>Use 8 or more characters with a mix of letters, numbers & symbols</div>
        <div>
          <input type='checkbox'/>
          <label>Show password</label>
        </div>
        <button>
          Create an account
        </button>
      </form>
    </div>
  )
}

export default SignupForm