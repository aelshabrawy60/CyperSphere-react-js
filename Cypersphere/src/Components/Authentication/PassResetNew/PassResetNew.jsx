import React from 'react'

import './PassResetNew.css'

function PassResetNew() {
  return (
    <div className='pass-reset-new'>
      <div>
        <button>back button</button>
      </div>
      <div className='logo_container'>
          <div className='img.png'></div>
      </div>
      <div>
        <div>
          <div>Create a new password</div>
          <div>Be careful that no one knows your password</div>
        </div>
        <form>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <label>New password</label>
              <div>
                icon
                Hide
              </div>
            </div>
            <input />
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <label>Confirm password</label>
              <div>
                icon
                Hide
              </div>
            </div>
            <input />
          </div>
          <div>
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PassResetNew