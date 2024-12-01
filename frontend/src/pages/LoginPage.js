import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'; // Import toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 7) {
      toast.warning('Password must be at least 7 characters'); // Display error toast
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `https://st-backend-2.onrender.com/users/login`,
        formData
      );
      
      const token = response.data.token;
      await login(token);
      toast.success('Login successful!'); // Show success toast on successful login

      const profession = response.data.user?.profession?.toLowerCase();
      switch (profession) {
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
          console.error('Unknown Role:', profession);
          toast.error('Unknown role. Please contact support.'); // Show error for unknown role
      }

    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Login failed. Please check your credentials and try again.'); // Show error toast on failure
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
        <div
          id="form-container"
          className="bg-white p-6 sm:p-8 md:p-16 rounded-lg shadow-2xl w-72 sm:w-80 md:w-80 lg:w-80 xl:w-80 relative z-10 transform transition duration-500 ease-in-out"
        >
          <h2
            id="form-title"
            className="text-center text-3xl font-bold mb-10 text-gray-800"
          >
            Log in
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
            />
            <button
              disabled={isLoading}
              type="submit"
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast container for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
