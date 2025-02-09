import React, { useState } from 'react'
import BlogPost from '../../../../Components/Platform/BlogPost/BlogPost'

// Dummy data for blog posts
const dummyPosts = [
  {
    id: 1,
    title: "Understanding Cross-Site Scripting (XSS) Attacks",
    excerpt: "Learn about different types of XSS attacks and how to prevent them in modern web applications.",
    author: "John Smith",
    date: "Jan 25, 2024",
    category: "Web Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    tags: ["XSS", "Security", "Web"]
  },
  {
    id: 2,
    title: "Introduction to Penetration Testing",
    excerpt: "A comprehensive guide to getting started with penetration testing and ethical hacking.",
    author: "Sarah Johnson",
    date: "Jan 23, 2024",
    category: "Ethical Hacking",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    tags: ["PenTest", "Hacking", "Security"]
  },
  {
    id: 3,
    title: "Securing Cloud Infrastructure",
    excerpt: "Best practices for securing your cloud infrastructure and preventing common vulnerabilities.",
    author: "Mike Wilson",
    date: "Jan 20, 2024",
    category: "Cloud Security",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    tags: ["Cloud", "AWS", "Security"]
  },
  {
    id: 4,
    title: "Blockchain Security Fundamentals",
    excerpt: "Understanding security considerations in blockchain technology and smart contracts.",
    author: "Alice Chen",
    date: "Jan 18, 2024",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55",
    tags: ["Blockchain", "Crypto", "Security"]
  },
]

const categories = ["All", "Web Security", "Ethical Hacking", "Cloud Security", "Blockchain", "Network Security"]

function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = dummyPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#4a5568] scrollbar-track-transparent">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 border
                          ${selectedCategory === category 
                            ? 'bg-[#63b3ed] text-white border-0' 
                            : 'bg-transparent text-white border-gray-600 hover:bg-[rgba(99,179,237,0.1)] hover:text-[#63b3ed] hover:border-[#63b3ed]'
                          }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <h4 className="text-xl font-semibold mb-2">No articles found</h4>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 animate-[fadeIn_0.5s_ease]">
          {filteredPosts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blog
