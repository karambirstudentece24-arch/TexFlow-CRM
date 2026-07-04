import axios from "axios";

const API_URL = "http://localhost:8000/api/dashboard";

// Dashboard Cards
export const getDashboardStats = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Revenue Analytics
export const getAnalytics = async () => {
  const response = await axios.get(`${API_URL}/analytics`);
  return response.data;
};

// Top Selling Products
export const getTopProducts = async () => {
  const response = await axios.get(`${API_URL}/top-products`);
  return response.data;
};