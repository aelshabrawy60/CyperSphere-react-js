import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidHide } from "react-icons/bi";

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const storeTokenAndRole = (token, expiration, studentId) => {
    localStorage.setItem('authToken', token);
    
    // Make sure to store expiration if provided
    if (expiration) {
      localStorage.setItem('tokenExpiration', expiration);
    }
    
    if(studentId){
      localStorage.setItem('studentId', studentId)
    }

    if (formData.email.toLowerCase() === 'admin@cybersphere.com') {
      localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.removeItem('isAdmin'); // Clear if not admin
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    try {
      const res = await fetch('https://cybersphere7.runasp.net/api/Account/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = res.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text };
      }
      console.log(data)


      if (res.ok) {
        if (data.token) {
          const studentId = data.studentId? data.studentId : null
          storeTokenAndRole(data.token, data.expiration, studentId);
          console.log("data", studentId)
          window.location.href = '/';
        } else {
          setMessage(data.message || 'OTP required');
          setOtpStage(true);
        }
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
  setIsOtpLoading(true);
  try {
    // Clean encoding of parameters
    const encodedEmail = encodeURIComponent(formData.email);
    const encodedOtp = encodeURIComponent(otp);
    
    const url = `https://cybersphere7.runasp.net/api/Account/login-twofactor?code=${encodedOtp}&email=${encodedEmail}`;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'accept': '*/*'
      },
      // Explicitly send an empty body as shown in the Swagger example
      body: '',
    });
    
    // Check content type to determine how to parse response
    const contentType = res.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      // Try to parse as JSON if possible
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }
    
    if (res.ok) {
      if (data.token) {
        // Make sure to include expiration if available
        const studentId = data.studentId? data.studentId : null
        storeTokenAndRole(data.token, data.expiration, studentId);
        window.location.href = '/';
      } else {
        setMessage('Login successful but no token received');
      }
    } else {
      // Log more detailed error information for debugging
      console.error('OTP verification failed:', {
        status: res.status,
        statusText: res.statusText,
        data
      });
      setMessage(data.message || `Invalid OTP (Status ${res.status}). Please try again.`);
    }
  } catch (err) {
    console.error('OTP verification error:', err);
    setMessage('OTP verification failed. Please try again.');
  } finally {
    setIsOtpLoading(false);
  }
};
  

  return (
    <div className="w-full ">
      <h2 className="text-3xl font-medium mb-4">Sign in</h2>

      <form onSubmit={handleLogin}>
        <div className="flex flex-col mb-3">
          <label className="text-sm font-medium text-gray-300 mb-1">Email address</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="text"
            className="px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col mb-1">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-300">Your password</label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="flex items-center text-blue-600 text-sm hover:text-blue-800 focus:outline-none"
              disabled={isLoading}
            >
              <BiSolidHide className="mr-1" />
              <span>{showPassword ? "Hide" : "Show"}</span>
            </button>
          </div>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type={showPassword ? "text" : "password"}
            className="px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        {otpStage && (
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              type="text"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={isOtpLoading}
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className={`mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center ${isOtpLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isOtpLoading}
            >
              {isOtpLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </div>
        )}

        <div className="flex justify-end w-full mt-2">
          <Link to="/reset-password" className="text-blue-600 hover:underline text-xs">
            Forget your password?
          </Link>
        </div>

        {!otpStage && (
          <div className="mb-4 pr-3">
            <button
              type="submit"
              className={`w-full px-4 py-2 mt-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        )}

        <div className="text-xs mt-3">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </div>

        {message && <div className="mt-4 text-sm text-red-600">{message}</div>}
      </form>
    </div>
  );
}

export default SigninForm;