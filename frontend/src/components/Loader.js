// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-4">
    <div className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
    aspect-square w-8 sm:w-20 flex justify-center items-center text-yellow-700"><span className='text-sm sm:text-3xl'>$</span></div>
    <div className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
    aspect-square w-8 sm:w-20 flex justify-center items-center text-yellow-700"><span className='text-sm sm:text-3xl'>£</span></div>
    <div className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
    aspect-square w-8 sm:w-20 flex justify-center items-center text-yellow-700"><span className='text-sm sm:text-3xl'>€</span></div>
    </div>
  );
};

export default Loader;
