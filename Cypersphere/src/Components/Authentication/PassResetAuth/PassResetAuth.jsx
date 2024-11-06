import React from 'react'
import {Link} from 'react-router-dom'
import './PassResetAuth.css'

function PassResetAuth() {
  return (
    <div className='pass-reset-auth-container'>
      <div>
        <Link to={'/signin'}><button>back button</button></Link>
      </div>
      <div className='logo_container'>
          <div className='img.png'></div>
      </div>
      <div>
        <div>
          <div>Reset password</div>
          <div>We need to confirm your identity to update your password</div>
        </div>
        <form>
          <div className='d-flex flex-column'>
            <label>email address</label>
            <input />
          </div>
          <div>
            <button>Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PassResetAuth