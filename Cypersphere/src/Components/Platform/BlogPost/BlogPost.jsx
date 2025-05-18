
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, X, Check, Loader2 } from 'lucide-react';

function BlogPost({ id, title, excerpt, author, date, category, image, tags, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; //
  const authToken = localStorage.getItem('authToken');
  
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description: excerpt,
    authorName: author,
    content: '',
    publishedAt: date,
    image,
  });
  
  const handleClick = () => {
    if (!editing) {
      navigate(`/academy/blog-post/${id}`);
    }
  };
  
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!authToken) {
      alert('No auth token found.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      setDeleting(true);
      try {
        const response = await fetch(`https://cybersphere7.runasp.net/api/Article?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        if (response.ok) {
          alert('Post deleted successfully.');
          onDelete(id);
        } else {
          alert('Failed to delete the post.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post.');
      } finally {
        setDeleting(false);
      }
    }
  };
  
  const handleEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
  };
  
  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setEditing(false);
    setEditData({
      title,
      description: excerpt,
      authorName: author,
      content: '',
      publishedAt: date,
      image,
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditData(prev => ({
        ...prev,
        imageFile: e.target.files[0]
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.stopPropagation();
    
    if (!authToken) {
      alert('No auth token found.');
      return;
    }
    
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('Title', editData.title);
      formData.append('Description', editData.description);
      formData.append('AuthorName', editData.authorName);
      formData.append('Content', editData.content);
      formData.append('PublishedAt', editData.publishedAt);
      formData.append('Image', editData.image);
      
      if (editData.imageFile) {
        formData.append('ImageFile', editData.imageFile);
      }
      
      const response = await fetch(`https://cybersphere7.runasp.net/api/Article/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        alert('Post updated successfully.');
        setEditing(false);
        if (onUpdate) {
          onUpdate(id, {
            ...editData,
            id
          });
        }
      } else {
        alert('Failed to update the post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred while updating the post.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`relative bg-slate-800 rounded-lg p-5 transition duration-300 ${!editing ? 'hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer' : 'cursor-default'}`}
    >
      {editing ? (
        <div className="space-y-4" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-cyan-400">Edit Post</h3>
            <div className="flex space-x-2">
              <button 
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded flex items-center gap-1 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Save
              </button>
              <button 
                onClick={handleCancelEdit}
                className="bg-slate-600 hover:bg-slate-700 text-white p-2 rounded flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input 
                type="text" 
                name="title" 
                value={editData.title} 
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea 
                name="description" 
                value={editData.description} 
                onChange={handleChange}
                rows="3"
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
              <input 
                type="text" 
                name="authorName" 
                value={editData.authorName} 
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input 
                type="date" 
                name="publishedAt" 
                value={editData.publishedAt.split('T')[0]} 
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
              <input 
                type="text" 
                name="image" 
                value={editData.image} 
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Upload New Image</label>
              <input 
                type="file" 
                onChange={handleFileChange}
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 file:cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
            <img
              src={image || '/api/placeholder/800/450'}
              alt={title}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="bg-cyan-900 text-cyan-100 px-4 py-1 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-cyan-800">
                {category}
              </span>
              <small className="text-slate-400 transition-colors duration-300">{new Date(date).toLocaleDateString()}</small>
            </div>
            
            <h3 className="text-slate-200 font-bold text-xl mb-3 leading-tight transition-colors duration-300 group-hover:text-white">{title}</h3>
            
            <p className="text-slate-300 text-base leading-relaxed mb-4 line-clamp-3 transition-colors duration-300">
              {excerpt}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-slate-300 transition-colors duration-300">{author}</span>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-700 text-slate-300 px-2 py-1 rounded-xl text-xs transition-colors duration-300 hover:bg-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {isAdmin && (
                  <div className="flex ml-2 gap-2">
                    <button
                      onClick={handleEdit}
                      className="text-cyan-500 hover:text-cyan-400 p-1 rounded-full hover:bg-slate-700 transition-colors duration-300"
                      aria-label="Edit post"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-slate-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Delete post"
                    >
                      {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BlogPost;