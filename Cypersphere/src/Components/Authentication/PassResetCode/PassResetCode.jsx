import React from 'react'

import './PassResetCode.css'

function PassResetCode() {
  return (
    <div className='pass-reset-code-container'>
      <div>
        <button>back button</button>
      </div>
      <div className='logo_container'>
          <div className='img.png'></div>
      </div>
      <div>
        <div>
          <div>Reset password</div>
          <div>Enter the code sent to you to verify your identity</div>
        </div>
        <div>
          <input></input>
          <div className='timer'>

          </div>
        </div>
        <div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default PassResetCode