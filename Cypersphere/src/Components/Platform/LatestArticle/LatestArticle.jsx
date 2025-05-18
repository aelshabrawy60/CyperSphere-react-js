
import React, { useState, useEffect } from 'react'
import BlogPost from '../BlogPost/BlogPost'
import { FaBookReader } from "react-icons/fa";

function LatestArticle() {
  const [latestPost, setLatestPost] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://cybersphere7.runasp.net/api/Article/get-all-articles');
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          setLatestPost(data[data.length - 1]);
        } else {
          setError('No articles found');
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message || 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="w-full animate-pulse">
      <div className="text-xl text-gray-300 mb-4">Latest Article</div>
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-300 w-full"></div>
        
        {/* Content skeleton */}
        <div className="p-4">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
          
          {/* Meta info skeleton */}
          <div className="flex space-x-2 mb-3">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
          
          {/* Excerpt skeleton - multiple lines */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
          
          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error state component with retry button
  const ErrorState = ({ message }) => (
    <div className="w-full rounded-lg border border-red-200 bg-red-50 p-6">
      <div className="flex flex-col items-center text-center">
        <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className="text-lg font-medium text-red-800 mb-1">Unable to load article</h3>
        <p className="text-sm text-red-600 mb-4">{message}</p>
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div className="flex flex-col items-center text-center">
        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 className="text-lg font-medium text-gray-800 mb-1">No Articles Available</h3>
        <p className="text-sm text-gray-600">Check back later for new content.</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm">
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState message={error} />
      ) : !latestPost || Object.keys(latestPost).length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mb-4 text-xl gap-3 font-semibold text-gray-300 flex items-center">
            <div className='text-blue-600'>
                <FaBookReader />
            </div>
            Latest Article
          </div>
          <BlogPost 
            id={latestPost.id} 
            title={latestPost.title} 
            excerpt={latestPost.description || latestPost.excerpt} 
            author={latestPost.authorName || latestPost.author} 
            date={new Date(latestPost.publishedAt || latestPost.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
            category={latestPost.category || "Article"}
            image={latestPost.image}
            tags={latestPost.tags || []}
          />
        </>
      )}
    </div>
  )
}

export default LatestArticle