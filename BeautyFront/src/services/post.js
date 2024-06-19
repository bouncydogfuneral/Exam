import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URLS = import.meta.env.VITE_API_URLS;

export const postTour = async (data) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postReview = async (data, procedureId) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.post(`${API_URLS}/${procedureId}/reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postProcedure = async (data) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
