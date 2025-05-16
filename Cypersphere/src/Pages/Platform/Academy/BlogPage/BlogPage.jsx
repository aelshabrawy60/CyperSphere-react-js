import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Tag, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

function BlogPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://cybersphere7.runasp.net/api/Article/get-article-id/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article not found');
          }
          throw new Error('Failed to fetch article');
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Function to estimate reading time
  const calculateReadingTime = (content) => {
    if (!content) return '3 min read'; // Default fallback
    
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    
    return `${minutes} min read`;
  };

  // Generate tags array (in case it's a string or doesn't exist)
  const getTags = () => {
    if (!article) return [];
    
    if (article.tags && Array.isArray(article.tags)) {
      return article.tags;
    }
    
    if (article.tags && typeof article.tags === 'string') {
      return article.tags.split(',').map(tag => tag.trim());
    }
    
    return ['Article'];
  };

  // Parse HTML content safely
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent || '' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 size={40} className="animate-spin text-blue-500 mb-4" />
          <p className="text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <AlertCircle size={50} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Article</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/academy/blog" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Back to Articles
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <AlertCircle size={50} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-300 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/academy/blog" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors inline-block"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section with Image */}
      <div className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src={article.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20">
          <div className="max-w-6xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <Link 
              to="/academy/blog" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to articles
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              {article.authorName && (
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>{article.authorName}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(article.createdAt || article.publishedDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{calculateReadingTime(article.content)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {article.description && (
          <div className="mb-10">
            <p className="text-xl text-gray-300 italic border-l-4 border-blue-500 pl-4">
              {article.description}
            </p>
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none">
          <div 
            dangerouslySetInnerHTML={createMarkup(article.content)} 
            className="article-content"
          />
        </div>

        {/* Tags and Share Section */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {getTags().map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full flex items-center"
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center flex-wrap gap-4">
            <Link 
              to="/academy/blog" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;