import { useState, useEffect } from 'react';

const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Check if we have a token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userEmail) {
      setUser({ email: userEmail });
    }
    
    // Handle the redirect back from Google
    const handleGoogleResponse = async () => {
      // Check if this is a redirect from Google OAuth
      if (window.location.pathname === '/api/Account/google-response') {
        setIsLoading(true);
        try {
          const response = await fetch('https://cybersphere7.runasp.net/api/Account/google-response');
          
          if (!response.ok) {
            throw new Error('Failed to complete Google authentication');
          }
          
          const data = await response.json();
          
          // Store the token and user info
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('tokenExpiration', data.expiration);
          
          setUser({ email: data.email });
          
          // Redirect to home page or dashboard
          window.location.href = '/';
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    handleGoogleResponse();
  }, []);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);
    
    // Redirect to the Google login endpoint
    window.location.href = 'https://cybersphere7.runasp.net/api/Account/google-login';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('tokenExpiration');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="w-6 h-6 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <span className="ml-2">Authenticating...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col items-center gap-2 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-800">{user.email}</p>
            <p className="text-xs text-gray-500">Logged in with Google</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        <span className="font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleLoginButton;