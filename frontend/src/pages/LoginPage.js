// LoginPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
  
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 7) {
      alert('Password must be at least 7 characters');
      return; // Prevent form submission
    }
    try {
    
      const response = await axios.post(`https://st-backend-2.onrender.com/users/login`, formData);
      console.log('User logged in:', response.data);

      // Assuming server sends back a JWT token in response.data.token
      const token = response.data.token;

      // Use the login function from AuthContext to handle token and user state
      await login(token);

      // Redirect user based on their role
      console.log('Role received:', response.data.user.profession
      ); // Log the role received from the server
      switch (response.data.user.profession) { // Ensure lowercase comparison for consistent checks
        case 'founder':
          navigate('/AllStartups');
          break;
        case 'investor':
          navigate('/AllInvestors');
          break;
        case 'visitor':
          navigate('/VisitorDashboard');
          break;
        default:
          console.error('Unknown Role:', response.data.role); // Log the unknown role for further investigation
      }
      
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
  <div className="relative">
    <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
    <div id="form-container" className="bg-white p-6 sm:p-8 md:p-16 rounded-lg shadow-2xl w-72 sm:w-80 md:w-80 lg:w-80 xl:w-80 relative z-10 transform transition duration-500 ease-in-out">
      <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Log in</h2>
    <form onSubmit={handleSubmit} className='space-y-5'>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className='w-full h-12 border border-gray-800 px-3 rounded-lg'
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className='w-full h-12 border border-gray-800 px-3 rounded-lg'
      />
      <button type="submit" className='w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Log in</button>
    </form>
    </div>
  </div>
</div>
  );
};

export default LoginPage;
