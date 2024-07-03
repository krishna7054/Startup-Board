import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import InvestorPage from './pages/InvestorPage';
import StartupPage from './pages/StartupPage';
import AllStartupsPage from './pages/AllStartupsPage';
import AllInvestorsPage from './pages/AllInvestorsPage';
import BlogPage from './pages/BlogPage';
import AllBlogsPage from './pages/AllBlogsPage';
import { AuthContext } from './context/AuthContext';
import './index.css';
import ProtectedRoute from './components/ProtectedRoute';
import React, { useContext } from 'react';
import Loader from './components/Loader';

function App() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
     
        <Loader />
      
    );
  }



  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/AllBlogs" element={<AllBlogsPage />} />
        <Route
          path="/AllStartups"
          element={
            user ? (
              <AllStartupsPage />
            ) : (
              
              <Navigate to="/" state={{ from: '/AllStartups' }} />
              
            )
          }
        />
        <Route
          path="/AllInvestors"
          element={
            user ? (
              <AllInvestorsPage />
            ) : (
              <Navigate to="/" state={{ from: '/AllInvestors' }} />
            )
          }
        />

        <Route
          path="/profile"
          element={
            user ? (
              <ProtectedRoute element={<ProfilePage />} />
            ) : (
              <Navigate to="/" state={{ from: '/profile' }} />
            )
          }
        />
        <Route
          path="/investor"
          element={
            user ? (
              <ProtectedRoute element={<InvestorPage />} allowedProfessions={['investor']} />
            ) : (
              <Navigate to="/" state={{ from: '/investor' }} />
            )
          }
        />
        <Route
          path="/startup"
          element={
            user ? (
              <ProtectedRoute element={<StartupPage />} allowedProfessions={['founder']} />
            ) : (
              <Navigate to="/" state={{ from: '/startup' }} />
            )
          }
        />
        <Route
          path="/blog"
          element={
            user ? (
              <ProtectedRoute element={<BlogPage />} />
            ) : (
              <Navigate to="/" state={{ from: '/blog' }} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
