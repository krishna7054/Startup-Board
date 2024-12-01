// authService.js
import axios from 'axios';

const API_URL = 'https://st-backend-2.onrender.com/users';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
  
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const getUserFromToken = () => {
  const token = localStorage.getItem('token'); // Replace with your storage mechanism
  if (!token) {
    console.error('Token not found');
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload; // Return the decoded payload
  } catch (error) {
    console.error('Invalid token format', error);
    return null;
  }
};

export const setUserToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeUserToken = () => {
  localStorage.removeItem('token');
};


// New function to get user by ID
export const getUserById = async (userId) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error; // Propagate the error to handle it further up in your application
  }
};