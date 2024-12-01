import React, { useState, useEffect } from 'react';
import { getBlogs, likeBlog } from '../services/blogService';

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsList = await getBlogs();
        setBlogs(blogsList);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleLike = async (blogId) => {
    try {
      await likeBlog(blogId);
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog._id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
        )
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error (optional)
      } else {
        console.error('Error liking blog:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl md:text-5xl italic font-bold mb-4 flex justify-center">All Blogs</h1>
      
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-stone-400 text-black max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 hover:shadow-2xl hover:bg-green-500 transition-all duration-500 ease-in-out">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-xl text-indigo-700 font-semibold">
                {blog.title}
              </div>
              <p className="block mt-1 text-lg leading-tight font-medium text-white">Author: {blog.author?.name || 'Unknown'} </p>
              <p className="mt-2 text-lg font-medium text-gray-800">{blog.content}</p>
              <p className="text-sm">Created At: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center justify-between mt-4 space-x-2 p-8">
              <button 
                className="text-red-500 hover:text-white"
                onClick={() => handleLike(blog._id)}
              >
                <svg id="heart" viewBox="0 0 47.5 47.5" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline">
                  <defs>
                    <clipPath id="a">
                      <path d="M0 38h38V0H0v38Z"></path>
                    </clipPath>
                  </defs>
                  <g transform="matrix(1.25 0 0 -1.25 0 47.5)" clipPath="url(#a)">
                    <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.633-8.018-4.129-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.772.098-1.52.266-2.241C2.752 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.469.268 2.241" fill="#be1931"></path>
                  </g>
                </svg>
                {blog.likes} Like
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBlogsPage;
