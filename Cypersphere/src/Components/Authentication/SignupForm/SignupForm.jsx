import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function SignupForm() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('https://cybersphere7.runasp.net/api/Account/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const text = await res.text();

      if (res.ok) {
        // Optionally show the message briefly before redirecting
        setMessage(text);
        setTimeout(() => {
          navigate('/signin'); // Redirect after success
        }, 1500);
      } else {
        setMessage(text || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
      <div className="text-sm mb-4">
        Already have an account?{' '}
        <Link to="/signin" className="text-blue-600 hover:underline">Log in</Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-wrap -mx-2 gap-y-3">
          <div className="w-full px-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="w-full px-2">

            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

          </div>
          <div className="w-full md:w-1/2 px-2">

            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

          </div>
          <div className="w-full md:w-1/2 px-2">

            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm your password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

          </div>
        </div>

        <div className="text-xs text-gray-500 mt-2 mb-2">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-1/2"
        >
          {loading ? 'Creating account...' : 'Create an account'}
        </button>

        {message && (
          <div className="mt-4 text-sm text-green-600">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
