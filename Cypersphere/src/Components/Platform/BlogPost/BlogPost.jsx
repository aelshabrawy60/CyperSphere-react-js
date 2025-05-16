import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BlogPost({ id, title, excerpt, author, date, category, image, tags, onDelete }) {
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  const authToken = localStorage.getItem('authToken')

  const [deleting, setDeleting] = useState(false)

  const handleClick = () => {
    navigate(`/academy/blog-post/${id}`)
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (!authToken) {
      alert('No auth token found.')
      return
    }

    setDeleting(true)
    try {
      const response = await fetch(`https://cybersphere7.runasp.net/api/Article?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })

      if (response.ok) {
        alert('Post deleted successfully.')
        onDelete()
        // Optional: refresh page or update state
      } else {
        alert('Failed to delete the post.')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('An error occurred.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-[#1a202c] rounded-lg p-4 transition duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30"
    >
      <div className="aspect-[3/2] w-full h-[150px] mb-3 overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="bg-[#2c5282] text-[#bee3f8] px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
            {category}
          </span>
          <small className="text-[#a0aec0] transition-colors duration-300">{date}</small>
        </div>
        <h3 className="text-[#e2e8f0] font-bold text-lg mb-2 leading-tight transition-colors duration-300">{title}</h3>
        <p className="text-[#cbd5e0] text-[0.95rem] leading-relaxed mb-3 line-clamp-3 transition-colors duration-300">
          {excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[0.9rem] font-medium text-[#cbd5e0] transition-colors duration-300">{author}</span>
          <div className="flex gap-2 items-center">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-[#2d3748] text-[#cbd5e0] px-2 py-0.5 rounded-xl text-xs transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
            {isAdmin && (
              <button 
                onClick={handleDelete}
                disabled={deleting}
                className="ml-2 text-red-500 hover:text-red-700 text-xs underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
