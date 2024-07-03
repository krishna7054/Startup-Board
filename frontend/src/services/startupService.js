import axios from 'axios';

const apiUrl = 'http://localhost:5000/startups/startups';

export const getStartups = async () => {
  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const addStartup = async (startup) => {
  const response = await axios.post(apiUrl, startup, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateStartup = async (id, startup) => {
  const response = await axios.patch(`${apiUrl}/${id}`, startup, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const deleteStartup = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
