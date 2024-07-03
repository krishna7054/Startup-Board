import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element, allowedProfessions }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      alert('Please log in to access this page.');
    }
  }, [user]); // useEffect will trigger whenever 'user' changes

  if (!user) {
    alert('Please log in to access this page.');
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (allowedProfessions && !allowedProfessions.includes(user.profession)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
