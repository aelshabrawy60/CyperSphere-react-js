import React, { useState, useEffect } from 'react';

function TrendingBooks() {
  const [trendingBook, setTrendingBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Book data from the provided file
  const booksData = [
    {
      "name": "Advanced Penetration Testing",
      "link": "https://drive.google.com/file/d/19GQo0-ohAX9InQek7x1VzRtSqph8UawI/view?usp=drive_link"
    },
    {
      "name": "The Basics of Web Hacking",
      "link": "https://drive.google.com/file/d/1gym41c9DWUbtNTMH_89UMiO1XpLImE9_/view?usp=drive_link"
    },
    {
      "name": "The Basics of Hacking and Penetration Testing",
      "link": "https://drive.google.com/file/d/1aM8UWjTlBPhX7DTSl5nqnsBXkCQ_WMuv/view?usp=drive_link"
    },
    {
      "name": "The Art of Deception by Kevin Mitnick",
      "link": "https://drive.google.com/file/d/1hNtmje1Z8HsW1oXSioTGoBCuwXL2OL7x/view?usp=drive_link"
    },
    {
      "name": "Gray Hat Hacking - The Ethical Hacker's Handbook",
      "link": "https://drive.google.com/file/d/1obMUWDPH5imEh93ZaIPmLbaIITxIr5mZ/view?usp=drive_link"
    }
  ];

  useEffect(() => {
    // Simulate fetching data with a delay
    const timer = setTimeout(() => {
      // Select a random trending book
      const randomIndex = Math.floor(Math.random() * booksData.length);
      setTrendingBook(booksData[randomIndex]);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="w-full animate-pulse bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center mb-4">
        <div className="h-5 w-5 rounded-full bg-blue-300 mr-2"></div>
        <div className="h-4 bg-gray-600 rounded w-32"></div>
      </div>
      
      <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
      
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-600 rounded w-5/6"></div>
      </div>
      
      <div className="h-10 bg-blue-600 opacity-50 rounded w-full"></div>
    </div>
  );

  // Empty state
  if (!loading && !trendingBook) {
    return (
      <div className="w-full bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
        <p className="text-gray-300">No trending books available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-4 text-xl font-semibold text-gray-300 flex items-center">
        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"></path>
        </svg>
        Trending Book
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 px-3 py-1 text-xs font-bold uppercase rounded-bl">
              Trending
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-gray-900 h-24 flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-400 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-white">{trendingBook.name}</h3>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-400 ml-2">Most downloaded this week</span>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <a 
                href={trendingBook.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download Book
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrendingBooks;