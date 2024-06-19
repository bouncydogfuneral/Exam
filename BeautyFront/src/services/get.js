import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URLA = import.meta.env.VITE_API_URLA;
const API_URLS = import.meta.env.VITE_API_URLS;

export const getAllTours = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const getAllProcedures = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const getOneProcedure = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(API_URLA);
  return response.data;
};

export const getOneTour = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getAllReviews = async () => {
  const response = await axios.get(API_URLS);
  return response.data;
};
