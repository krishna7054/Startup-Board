import React from 'react';
import Footer from '../components/Footer';
import { ReactComponent as MyIcon } from '../assets/undraw_business_deal_re_up4u.svg';
import { ReactComponent as ProsIcon } from '../assets/undraw_join_re_w1lh.svg';
import { ReactComponent as ConsIcon } from '../assets/undraw_cancel_re_pkdm.svg';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-col lg:flex-row justify-between'>
        <div className='my-auto lg:mr-10'>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center lg:text-left mt-4">Welcome to</h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-right-0 font-serif mb-5 text-red-400">The Startup Board</h2>
          <p className="text-lg md:text-xl lg:text-2xl text-center lg:text-left mb-1 font-mono">
            Your hub for startups and investors to connect and collaborate.
          </p>
          <p className="text-center lg:text-center text-md md:text-lg mt-1 font-mono">Please log in to access more features.</p>
        </div>
        <div className='-mt-20 lg:mt-0'>
          <MyIcon className="w-full max-w-lg mx-auto lg:mx-0" />
        </div>
      </div>
      <div className='w-full bg-gray-800 mb-5 mt-10'>
        <h1 className='text-white text-3xl lg:text-4xl flex justify-center p-5'>Our community on the platform</h1>
        <div className='flex flex-col md:flex-row justify-evenly p-6 space-y-4 md:space-y-0'>
          <div className='text-white text-center'>
            <p className='flex justify-center font-bold text-3xl'>2000</p>
            <p className='font-thin lg:text-2xl'>Founders</p>
          </div>
          <div className='text-white text-center'>
            <p className='flex justify-center font-bold text-3xl'>400</p>
            <p className='font-thin lg:text-2xl'>Blogs</p>
          </div>
          <div className='text-white text-center'>
            <p className='flex justify-center font-bold text-3xl'>100</p>
            <p className='font-thin lg:text-2xl'>Investors</p>
          </div>
        </div>
      </div>

      {/* ---- */}

      <div><h2 className=" flex justify-center text-2xl md:text-3xl lg:text-5xl font-semibold  p-6 animate-pulse">Why Choose Us?</h2>

      <div className='flex flex-col lg:flex-row justify-between '>
      
        <div className="p-6 my-auto  lg:w-1/2 lg:pr-10">
          
          <ul className="list-disc list-inside space-y-4 md:space-y-6 lg:space-y-8">
            <li className="text-xl md:text-2xl lg:text-xl font-serif">
              <span className="font-bold">User-Friendly Interface:</span> Our platform is designed to be intuitive and easy to use, whether you're a startup or an investor.
            </li>
            <li className="text-xl md:text-2xl lg:text-xl font-serif">
              <span className="font-bold">Secure and Reliable:</span> We prioritize your data security and ensure reliable connections between users.
            </li>
            <li className="text-xl md:text-2xl lg:text-xl font-serif">
              <span className="font-bold">Comprehensive Profiles:</span> Detailed profiles for both startups and investors help you find the perfect match.
            </li>
          </ul>
        </div>
        <div className=' lg:mt-0 lg:w-1/2'>
          <ProsIcon className="w-full max-w-md mx-auto " />
        </div>
      </div>
      </div>

      {/* --- */}

      <div><h2 className="flex justify-center text-2xl md:text-3xl lg:text-5xl font-semibold  p-6 animate-pulse sm:-mb-20">What Other Sites Lack</h2>

      <div className='flex flex-col lg:flex-row justify-between '>
        <div className=' lg:mt-0 lg:w-1/2'>
          <ConsIcon className="w-full max-w-md mx-auto " />
        </div>
        <div className="p-6 my-auto lg:w-1/2 lg:pl-10">
          
          <ul className="list-disc list-inside space-y-4 md:space-y-6 lg:space-y-8">
            <li className="text-xl md:text-2xl lg:text-xl font-serif">
              <span className="font-bold">Complex Interfaces:</span> Many other platforms are cluttered and difficult to navigate.
            </li>
            <li className="text-xl md:text-2xl lg:text-xl font-serif">
              <span className="font-bold">Poor Security:</span> Data breaches and unreliable connections are common issues.
            </li>
            <li className="text-xl md:text-2xl lg:text-xl font-serif">
              <span className="font-bold">Limited Profiles:</span> Incomplete or vague profiles make it hard to find the right connections.
            </li>
          </ul>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
