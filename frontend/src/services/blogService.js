// blogService.js

import axios from 'axios';

const API_URL = 'https://st-backend-2.onrender.com/blogs'; // Replace with your backend URL

// Helper function to get authorization token from localStorage or wherever you store it
const getAuthToken = () => {
  return localStorage.getItem('token'); // Adjust this based on where you store your token
};

export const getBlogs = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  });
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  });
  return response.data;
};

export const addBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const updateBlog = async (_id, blogData) => {
  const response = await axios.put(`${API_URL}/${_id}`, blogData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  });
  return response.data;
};


export const likeBlog = async (blogId) => {
  try {
    const response = await axios.post(`${API_URL}/${blogId}/like`, null, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error; // Propagate the error for handling in the calling component
  }
};
