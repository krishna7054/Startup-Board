// InvestorPage.js
import React, { useState, useEffect } from 'react';
import { getInvestors, addInvestor, updateInvestor, deleteInvestor } from '../services/investorService';
import { getUserFromToken } from '../services/authService';


const InvestorPage = () => {
  const [investors, setInvestors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    investmentFields:'',
    investmentAmount: '',
    email:'',
    
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  // const [error, setError] = useState('');
  const currentUser = getUserFromToken();

 

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const investorsList = await getInvestors();
        // Filter investors for the current user
        const userInvestors = investorsList.filter(
          (investor) => investor.investor === currentUser?._id
        );
        setInvestors(userInvestors);
      } catch (err) {
        // setError('Failed to fetch investors');
        console.error('Failed to fetch investors:', err);
      }
    };
    fetchInvestors();
  }, [currentUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateInvestor(editId, formData);
      } else {
        await addInvestor(formData);
      }
      // Refresh investors after adding/updating
      setInvestors((prev) =>
        editMode
          ? prev.map((investor) =>
              investor._id === editId ? { ...investor, ...formData } : investor
            )
          : [...prev, formData]
      );
      setFormData({ name: '', description: '', investmentFields: '', investmentAmount: '', email: '' });
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      // setError('Failed to save investor');
      console.error('Failed to save investor:', err);
    }
  };

  const handleEdit = (investor) => {
    setFormData({
      name: investor.name,
      description: investor.description,
      investmentFields: investor.investmentFields,
      investmentAmount: investor.investmentAmount,
      email: investor.email,
    });
    setEditMode(true);
    setEditId(investor._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this investor?')) {
      try {
        await deleteInvestor(id);
        // Refresh investors after deletion
        setInvestors((prev) => prev.filter((investor) => investor._id !== id));
      } catch (err) {
        // setError('Failed to delete investor');
        console.error('Failed to delete investor:', err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-5xl font-bold italic mb-4 flex justify-center">Add Your Investor Forum</h1>
      <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mb-4 bg-zinc-300 w-full md:w-3/4 lg:w-1/2 p-5 shadow-md rounded-md">
        <div className="mb-3">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Investor/ Forum"
            className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
          />
        </div>
        <div className="mb-3">
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="About"
            className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
          />
        </div>
        <div className="mb-3">
        
          <input
            type="text"
            id="investmentFields"
            name="investmentFields"
            value={formData.investmentFields}
            onChange={handleInputChange}
            required
            placeholder="InvestmentFields"
            className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
          />
        </div>
        <div className="mb-3">
          
          <input
            type="number"
            id="investmentAmount"
            name="investmentAmount"
            value={formData.investmentAmount}
            onChange={handleInputChange}
            required
            placeholder="InvestmentAmount"
            className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email"
            className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
          />
        </div>
        
        <div className='flex '>
          <button
            type="submit"
            className="mx-auto p-2 w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#9fa9e4] before:to-[rgb(105,131,184)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            {editMode ? 'Update Investor' : 'Add Investor'}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setFormData({ name: '', description: '', investmentFields:'',investmentAmount:'', email:'' });
              }}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mx-auto p-2 w-[150px]  h-[50px] my-3 flex items-center justify-center  cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#9fa9e4] before:to-[rgb(105,131,184)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 "
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      </div>

      {/* List of investors */}
      <div className="mt-5">
        {investors.map((investor) => (
          <div key={investor._id} className="mx-auto service-card w-full md:w-3/4 lg:w-1/2 shadow-xl cursor-pointer snap-center shrink-0 py-8 px-6 bg-white flex flex-col justify-between gap-3 transition-all duration-300 group hover:bg-[#9fa9e4]">
            <div className="flex flex-col md:flex-row justify-between">
            <div className="italic mb-4 md:mb-0">
            <h2 className="text-2xl"><span className="font-semibold" >Investor:</span> {investor.name}</h2>
            <p><span className="font-semibold">About:</span> {investor.description}</p>
            <p><span className="font-semibold">Investment Field:</span> {investor.investmentFields}</p>
            <p><span className="font-semibold">Investment Amount:</span> {investor.investmentAmount}</p>
            <p><span className="font-semibold">Email:</span>{investor.email}</p>
            </div>
            {currentUser && currentUser._id === investor.investor && (
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(investor)}
                className="p-3  cursor-pointer text-white font-bold shadow-md hover:scale-105 shadow-yellow-50 rounded px-5 py-2 bg-gradient-to-bl from-yellow-500 to-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(investor._id)}
                className="p-3 cursor-pointer text-white font-bold shadow-md hover:scale-105 shadow-red-500 rounded px-5 py-2 bg-gradient-to-bl from-red-500 to-red-500"
              >
                Delete
              </button>
            </div>
            )}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorPage;
