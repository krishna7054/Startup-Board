import axios from 'axios';

const API_URL = 'https://st-backend-2.onrender.com/investors';

const getToken = () => {
  return localStorage.getItem('token');
};

export const getInvestors = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching investors:', error);
    throw error;
  }
};

export const addInvestor = async (investorData) => {
  try {
    const token = getToken();
    const response = await axios.post(API_URL, investorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding investor:', error);
    throw error;
  }
};

export const updateInvestor = async (id, investorData) => {
  try {
    const token = getToken();
    const response = await axios.patch(`${API_URL}/${id}`, investorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating investor with ID ${id}:`, error);
    throw error;
  }
};

export const deleteInvestor = async (id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting investor with ID ${id}:`, error);
    throw error;
  }
};
