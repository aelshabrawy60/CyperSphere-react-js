import React, { useState } from 'react';

import './PassResetNew.css';
import { BiSolidHide } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";


function PassResetNew({setPage}) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='pass-reset-new'>
      <div>
        <button onClick={()=> setPage(1)} className='back__btn'><IoIosArrowBack /></button>
      </div>
      <div className='logo_container text-center mb-5'>
        <div>CyberSphere</div>
      </div>
      <div>
        <div className='mb-4'>
          <div className='page-name'>Create a new password</div>
          <div>Be careful that no one knows your password</div>
        </div>
        <form>
          <div className='d-flex flex-column mb-3'>
            <div className='d-flex justify-content-between'>
              <label>New password</label>
              <div>
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="password-toggle-button"
                >
                  <BiSolidHide /> <span>{showNewPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
            />
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <label>Confirm password</label>
              <div>
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="password-toggle-button"
                >
                  <BiSolidHide /> <span>{showConfirmPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
            />
          </div>
          <div className='mt-4'>
            <button type="submit" className='main_btn w-50'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PassResetNew;
