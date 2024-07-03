import React, { useState, useEffect } from 'react';
import { getStartups } from '../services/startupService';
import { useNavigate } from 'react-router-dom';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

const AllStartupsPage = () => {
  const [startups, setStartups] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const startupsList = await getStartups();
        setStartups(startupsList);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('You are not authorized to view this page. Please log in.');
          navigate('/login'); // Redirect to login page
        } else {
          setError('An error occurred while fetching startups.');
        }
      }
    };
    fetchStartups();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl md:text-5xl italic font-bold mb-4 flex justify-center">All Startups</h1>
      <div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {startups.map((startup) => (
              <div
                key={startup._id}
                role="alert"
                className="justify-between italic mx-auto mb-5 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/2 text-2xl bg-cyan-100 dark:bg-cyan-800 border-l-4 border-cyan-500 dark:border-cyan-700 text-green-900 dark:text-white p-4 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-slate-200 dark:hover:bg-slate-800 transform hover:scale-105"
              >
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    <span className="font-semibold text-fuchsia-200">Company:</span> {startup.name}
                  </h2>
                  <p className="text-md md:text-lg lg:text-xl xl:text-2xl">
                    <span className="font-semibold text-fuchsia-200">About:</span> {startup.description}
                  </p>
                  <p className="text-md md:text-lg lg:text-xl xl:text-2xl">
                    <span className="font-semibold text-fuchsia-200">Website:</span> {startup.website}
                  </p>
                  <p className="text-md md:text-lg lg:text-xl xl:text-2xl">
                    <span className="font-semibold text-fuchsia-200">Founding Date:</span> {new Date(startup.foundingDate).toLocaleDateString()}
                  </p>
                  <p className="text-md md:text-lg lg:text-xl xl:text-2xl">
                    <span className="font-semibold text-fuchsia-200">Email:</span> {startup.email}
                  </p>
                </div>
                <div className="hidden md:flex ml-20  ">
                  <BuildingOfficeIcon className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 xl:h-40 xl:w-40 text-cyan-900 dark:text-cyan-200" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStartupsPage;
