import React from 'react';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));


root.render(
  
    <AuthProvider>
      <App />
    </AuthProvider>
  
);
