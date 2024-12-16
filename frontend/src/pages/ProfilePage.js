import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: 'founder',
    profilePicture: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://st-backend-2.onrender.com/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          profession: response.data.profession,
          profilePicture: null,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, profilePicture: e.target.files[0] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('email', formData.email);
    updatedData.append('profession', formData.profession);
    if (formData.profilePicture) {
      updatedData.append('profilePicture', formData.profilePicture);
    }

    try {
      const response = await axios.patch('https://st-backend-2.onrender.com/users/me', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="  min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 max-w-xl w-full">
        <div className="flex flex-col items-center">
    <div className="w-32 h-32 rounded-full object-cover mb-4> {user.name[0]}</div>
          // {user.profilePicture && (
            // <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
            
          // )}
  
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2">{user.name}'s Profile</h2>
          <p className="text-gray-600 mb-4  text-xl sm:text-lg md:text-xl">{user.profession}</p>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <button onClick={() => setEditing(!editing)} className="bg-blue-500 text-white py-2 px-4 rounded-full mb-4">
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        {editing && (
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold italic mb-4">Update Profile</h1>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Profession:</label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="border p-2 rounded-lg"
              >
                <option value="founder">Founder</option>
                <option value="investor">Investor</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Profile Picture:</label>
              <input type="file" name="profilePicture" onChange={handleFileChange} />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
