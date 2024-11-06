import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidHide } from "react-icons/bi";

import './SigninForm.css';

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='signin-form-containter'>
      <div>Sign in</div>
      <form className=''>
        <div className='d-flex flex-column'>
          <label>User name or email address</label>
          <input type="text" />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <label>Your password</label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle-button"
            >
              <BiSolidHide /> <span>{showPassword ? "Hide" : "Show"}</span>
            </button>
          </div>
          <input type={showPassword ? "text" : "password"} />
        </div>
        <div className='d-flex justify-content-end w-100'>
          <div><Link to={'/reset-password'}>Forget your password</Link></div>
        </div>
        <div>
          <button type="submit">Sign in</button>
          <div>Don’t have an account? <Link to={'/signup'}>Sign up</Link></div>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;
