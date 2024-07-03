import React, { useState } from 'react';


const ProfilePictureUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);
      onUpload(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input type="file" onChange={handleFileChange} className="my-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  );
};

export default ProfilePictureUpload;
