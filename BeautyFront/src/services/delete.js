import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const deleteData = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteProcedure = async (id) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
