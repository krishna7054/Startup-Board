// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getUserFromToken, removeUserToken, setUserToken, getUserById } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [userId, setUserId] = useState(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userId = await getUserFromToken(token);
          const user= await getUserById(userId._id);
          
          console.log("userId", userId);
          console.log("user:", user);
          setUser(user);
        } catch (error) {
          console.error('Error fetching user:', error);
          removeUserToken(); // Clear token if user fetch fails
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (token) => {
    setUserToken(token);
    try {
      const userId = await getUserFromToken(token);
      const user= await getUserById(userId._id);
      setUser(user); // Update user state after successful login
      console.log('User logged inn:', user); // Check user data after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      removeUserToken(); // Clear token if login fails
      setUser(null);
    }
  };

  const logout = () => {
    removeUserToken();
    setUser(null); // Clear user state on logout
    
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
