import React from 'react'

import './SigninForm.css'

function SigninForm() {
  return (
    <div className='signin-form-containter'>
        <div>Sign in</div>
        <form className=''>
          <div className='d-flex flex-column'>
            <label>User name or email address</label>
            <input />
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <label>your password</label>
              <div>
                icon
                Hide
              </div>
            </div>
            <input />
          </div>
          <div className='d-flex justify-content-end w-100'>
            <div>Forget your password</div>
          </div>
          <div>
            <button>Sign in</button>
            <div>Don’t have an acount? <span>Sign up</span></div>
          </div>
        </form>
    </div>
  )
}

export default SigninForm