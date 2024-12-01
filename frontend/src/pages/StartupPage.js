import React, { useState, useEffect } from 'react';
import { getStartups, addStartup, updateStartup, deleteStartup } from '../services/startupService';
import { getUserFromToken } from '../services/authService';

const StartupPage = () => {
  const [startups, setStartups] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', website: '', foundingDate: '', email: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow]= useState(false);
  const currentUser = getUserFromToken();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const startupsList = await getStartups();
        // Filter startups for the current user
        const userStartups = startupsList.filter(
          (startup) => startup.founder === currentUser?._id
        );
        setStartups(userStartups);
      } catch (error) {
        setError('Failed to fetch startups');
        console.error('Failed to fetch startups:', error);
      }
    };
    fetchStartups();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      if (editing) {
        await updateStartup(editing._id, form);
      } else {
        await addStartup(form);
      }
      setForm({ name: '', description: '', website: '', foundingDate: '', email: '' });
      setEditing(null);
      const startupsList = await getStartups();
      setStartups(startupsList);
    } catch (error) {
      setError(editing ? 'Failed to update startup/ Investors are not allowed' : 'Failed to add startup');
      console.error(error);
    }
  };

  const handleEdit = (startup) => {
    setForm({ name: startup.name, description: startup.description, website: startup.website, foundingDate: startup.foundingDate, email: startup.email });
    setEditing(startup);
  };

  const handleDelete = async (id) => {
    setError(null); // Reset error state
    try {
      await deleteStartup(id);
      const startupsList = await getStartups();
      setStartups(startupsList);
    } catch (error) {
      setError('Failed to delete startup');
      console.error('Failed to delete startup:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl md:text-5xl font-bold italic mb-4 flex justify-center">Add Your Company</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="mb-4 bg-zinc-300 w-full md:w-3/4 lg:w-1/2 p-5 shadow-md rounded-md">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Company"
              className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="About"
              className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Website"
              className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
            />
          </div>
          <div className="mb-3">
            <span className="italic">Founding Date: (Registration Date of Company)</span>
            <input
              type="date"
              name="foundingDate"
              value={form.foundingDate}
              onChange={handleChange}
              placeholder="Founding Date"
              className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 w-full bg-zinc-100 text-black italic font-semibold text-lg font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-black placeholder:opacity-100 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-50"
            />
          </div>
          <button type="submit" className="mx-auto p-2 w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#9fa9e4] before:to-[rgb(105,131,184)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
            {editing ? 'Update' : 'Add'} Startup
          </button>
        </form>
      </div>

      <div className="mt-5">
        {startups.map((startup) => (
          <div key={startup._id} className="mx-auto service-card w-full md:w-3/4 lg:w-1/2 shadow-xl cursor-pointer snap-center shrink-0 py-8 px-6 bg-white flex flex-col justify-between gap-3 transition-all duration-300 group hover:bg-[#9fa9e4]">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="italic mb-4 md:mb-0">
                <h2 className="text-2xl"><span className="font-semibold">Company:</span> {startup.name}</h2>
                <p><span className="font-semibold">About:</span> {startup.description}</p>
                <p><span className="font-semibold">Website:</span> {startup.website}</p>
                <p><span className="font-semibold">Founding Date:</span> {new Date(startup.foundingDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Email:</span> {startup.email}</p>
              </div>
              {currentUser && currentUser._id === startup.founder && (
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleEdit(startup)}
                    className="p-3 cursor-pointer text-white font-bold shadow-md hover:scale-105 shadow-yellow-50 rounded px-5 py-2 bg-gradient-to-bl from-yellow-500 to-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(startup._id)}
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

export default StartupPage;
