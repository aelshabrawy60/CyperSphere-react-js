import React, { useState, useEffect } from 'react';

const Certificates = ({ studentId }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth token from local storage
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fetch certificates for the student
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        
        const response = await fetch(
          `https://cybersphere7.runasp.net/api/Certificate/student/${studentId}`,
          {
            headers: {
              'Accept': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch certificates: ${response.status}`);
        }
        
        const data = await response.json();
        setCertificates(data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [studentId]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        {[1, 2].map(i => (
          <div key={i} className="mb-3">
            <div className="h-5 bg-gray-700 rounded w-2/3 mb-1"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 text-red-500 p-3 rounded">
        Error loading certificates: {error}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Certifications</h3>
      
      {certificates && certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <div 
              key={index}
              className="border border-[#2A69B5] rounded-lg p-3 hover:bg-[#2A69B5] hover:bg-opacity-10 transition-colors"
            >
              <h4 className="text-white font-medium">{cert.courseTitle}</h4>
              <p className="text-gray-400 text-sm">Issued on {formatDate(cert.issuedAt)}</p>
              
              {cert.certificateURL && (
                <a 
                  href={`https://cybersphere7.runasp.net/${cert.certificateURL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[#2A69B5] hover:text-[#5089D5] text-sm flex items-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No certifications yet</p>
      )}
    </div>
  );
};

export default Certificates;