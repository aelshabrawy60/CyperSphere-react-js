import React, { useState, useEffect } from 'react';
import AddBlogPost from '../../Components/Platform/AddBlogPost/AddBlogPost';
import BlogPost from '../../Components/Platform/BlogPost/BlogPost';

function AdminBlogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
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
        
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message || 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = posts.filter(post => 
      post.title?.toLowerCase().includes(query) || 
      post.excerpt?.toLowerCase().includes(query) || 
      post.description?.toLowerCase().includes(query) || 
      post.author?.toLowerCase().includes(query) ||
      post.authorName?.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query))) ||
      post.category?.toLowerCase().includes(query)
    );
    
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);
  
  // Function to refresh posts after adding a new one
  const refreshPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://cybersphere7.runasp.net/api/Article/get-all-articles');
      
      if (!response.ok) {
        throw new Error('Failed to refresh articles');
      }
      
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      console.error('Error refreshing articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-5">
      <div className="mb-8">
        <div className="mb-8">
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-[#4a5568] bg-[#2d3748] text-white transition duration-300
                      placeholder:text-white/60 focus:border-[#63b3ed] focus:shadow-[0_0_0_2px_rgba(99,179,237,0.1)] focus:outline-none"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <AddBlogPost onPostCreated={refreshPosts} onAdd={refreshPosts}/>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 py-12">
          <h4 className="text-xl font-semibold mb-2">Error loading articles</h4>
          <p>{error}</p>
          <button 
            onClick={refreshPosts}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <h4 className="text-xl font-semibold mb-2">No articles found</h4>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 animate-[fadeIn_0.5s_ease]">
          {filteredPosts.map((post) => (
            <BlogPost 
              key={post.id} 
              id={post.id}
              title={post.title}
              excerpt={post.description || post.excerpt}
              author={post.authorName || post.author}
              date={new Date(post.publishedAt || post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
              category={post.category || "Article"}
              image={post.image}
              tags={post.tags || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBlogs;