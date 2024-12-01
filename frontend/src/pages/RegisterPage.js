import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profession: 'founder',
    profilePicture: null,
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profession', formData.profession);
    if (formData.profilePicture) {
      data.append('profilePicture', formData.profilePicture);
    }
    
    if (formData.password.length < 7) {
      toast.warning('Password must be at least 7 characters');
      return; // Prevent form submission
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://st-backend-2.onrender.com/users/register`,
        data
      );
      console.log('User registered:', response.data);
      toast.success('Registration successful! Redirecting to login...');
      navigate('/login');

      // Assuming server sends back a JWT token in response.data.token
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);

    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Error registering user. Please try again.'); // Show error toast
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="relative">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
        <div id="form-container" className="bg-white p-2 sm:p-4 md:p-4 rounded-lg shadow-2xl w-72 sm:w-72 md:w-72 lg:w-80 xl:w-80 relative z-10 transform transition duration-500 ease-in-out">
          <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Register</h2>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className='w-full h-12 border border-gray-800 px-3 rounded-lg'
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className='w-full h-12 border border-gray-800 px-3 rounded-lg'
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className='w-full h-12 border border-gray-800 px-3 rounded-lg'
            />
            <select name="profession" value={formData.profession} onChange={handleChange} className='w-full h-12 border border-gray-800 px-3 rounded-lg'>
              <option value="founder">Founder</option>
              <option value="investor">Investor</option>
            </select>
            <div>
              <span className='font-semibold'>Profile Picture</span>
              <input type="file" name="profilePicture" onChange={handleFileChange} />
            </div>
            <button disabled={isLoading} type="submit" className='w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast container for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
