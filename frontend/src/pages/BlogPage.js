// BlogPage.jsx

import React, { useState, useEffect } from 'react';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../services/blogService';
import { getUserFromToken } from '../services/authService';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const currentUser = getUserFromToken();

  useEffect(() => {
     const fetchBlogs = async () => {
    try{
      const blogsList = await getBlogs();
      const userBlogs=blogsList.filter(
        (blog) => blog.author?._id === currentUser?._id
      );
      setBlogs(userBlogs);
    }catch(error){
      console.log(error);
    }
  };
    fetchBlogs();
  }, [currentUser]);

 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateBlog(editId, formData);
    } else {
      await addBlog(formData);
    }
    fetchBlogs();
    setFormData({ title: '', content: '' });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content });
    setEditMode(true);
    setEditId(blog._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl md:text-5xl font-bold italic mb-4 flex justify-center">Create your Blog</h1>

      <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mb-4 bg-zinc-300 w-full md:w-3/4 lg:w-1/2 p-5 shadow-md rounded-md">
        <div className="mb-3">
          <label htmlFor="title" className="block text-md font-medium italic text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="block text-md font-medium italic text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows="4"
            className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
          ></textarea>
        </div>
        <div className='flex '>
          <button
            type="submit"
            className="mx-auto p-2 w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#9fa9e4] before:to-[rgb(105,131,184)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            {editMode ? 'Update Blog Post' : 'Add Blog Post'}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setFormData({ title: '', content: '' });
              }}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mx-auto p-2 w-[150px]  h-[50px] my-3 flex items-center justify-center  cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#9fa9e4] before:to-[rgb(105,131,184)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      </div>

      {/* List of blogs */}
      <div className="mt-5">
        {blogs.map((blog) => (
          <div key={blog._id} className="mx-auto service-card w-full md:w-3/4 lg:w-1/2 shadow-xl cursor-pointer snap-center shrink-0 py-8 px-6 bg-white flex flex-col justify-between gap-3 transition-all duration-300 group hover:bg-[#9fa9e4]">
             <div className="flex flex-col md:flex-row justify-between">
             <div className="italic mb-4 md:mb-0">
            <h2 className="text-2xl"><span className='font-semibold'>Title:</span> {blog.title}</h2>
            <p><span className='font-semibold'>Content</span> {blog.content}</p>
            </div>
            {(currentUser && currentUser._id===blog.author?._id &&
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(blog)}
                className="p-3  cursor-pointer text-white font-bold shadow-md hover:scale-105 shadow-yellow-50 rounded px-5 py-2 bg-gradient-to-bl from-yellow-500 to-yellow-500"
              >
                Edit
              </button>
           
              <button
                onClick={() => handleDelete(blog._id)}
                className="p-3 cursor-pointer text-white font-bold shadow-md hover:scale-105 shadow-red-500 rounded px-5 py-2 bg-gradient-to-bl from-red-500 to-red-500"
              >
                Delete
              </button>
            </div>
             )}
          </div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
