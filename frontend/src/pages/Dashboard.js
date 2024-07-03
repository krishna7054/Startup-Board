// dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);  // Log token for debugging
        const response = await axios.get(`http://localhost:5000/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderDashboard = () => {
    switch (user.profession) {
      case 'founder':
        return navigate('/AllStartups');
       
      case 'investor':
        return navigate('/AllInvestors');
         
      case 'visitor':
        return <div>
          <h2>Visitor Dashboard</h2>
          
          </div>;
      default:
        return <div>Unknown Role</div>;
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
