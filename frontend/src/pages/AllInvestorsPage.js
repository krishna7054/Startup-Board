import React, { useState, useEffect } from 'react';
import { getInvestors } from '../services/investorService';
import { useNavigate } from 'react-router-dom';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const AllInvestorsPage = () => {
  const [investors, setInvestors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvestorsData = async () => {
      try {
        const investorsList = await getInvestors();
        setInvestors(investorsList);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('You are not authorized to view this page. Please log in.');
          navigate('/login'); // Redirect to login page
        } else {
          setError('An error occurred while fetching investors.');
        }
      }
    };
    fetchInvestorsData();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl md:text-5xl italic font-bold mb-4 flex justify-center">All Investors</h1>
      <div></div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {investors.map((investor) => (
            <div key={investor._id} role="alert"
            className="justify-between italic mx-auto mb-5 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/2 text-2xl bg-cyan-100 dark:bg-cyan-800 border-l-4 border-cyan-500 dark:border-cyan-700 text-green-900 dark:text-white p-4 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-slate-200 dark:hover:bg-slate-800 transform hover:scale-105">
              <div className="p-md:p-6">
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
               <span className="font-semibold text-fuchsia-200">Investor:</span> {investor.name}</h2>
              <p className="text-md md:text-lg lg:text-xl xl:text-2xl"><span className="font-semibold text-fuchsia-200">About:</span> {investor.description}</p>
              <p className="text-md md:text-lg lg:text-xl xl:text-2xl"><span className="font-semibold text-fuchsia-200">Investment Fields:</span> {investor.investmentFields}</p>
              <p className="text-md md:text-lg lg:text-xl xl:text-2xl"><span className="font-semibold text-fuchsia-200">Investment Amount:</span> {investor.investmentAmount}</p>
              <p className="text-md md:text-lg lg:text-xl xl:text-2xl"><span className="font-semibold text-fuchsia-200">Email:</span> {investor.email}</p>
            </div>
            <div className="hidden md:flex ml-20  ">
                  <CurrencyDollarIcon className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 xl:h-40 xl:w-40 text-cyan-900 dark:text-cyan-200" />
                </div>
                </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInvestorsPage;
