import axios from "axios";
import API_URL from "../config/api";

// Dashboard Cards
export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

// Revenue Analytics
export const getAnalytics = async () => {
  const response = await axios.get(`${API_URL}/dashboard/analytics`);
  return response.data;
};

// Top Selling Products
export const getTopProducts = async () => {
  const response = await axios.get(`${API_URL}/dashboard/top-products`);
  return response.data;
};