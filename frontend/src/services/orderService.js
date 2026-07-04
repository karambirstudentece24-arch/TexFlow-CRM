import axios from "axios";

const API_URL = "http://localhost:8000/api/orders";

// GET Orders
export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ADD Order
export const addOrder = async (order) => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

// UPDATE Order
export const updateOrder = async (id, order) => {
  const response = await axios.put(`${API_URL}/${id}`, order);
  return response.data;
};

// DELETE Order
export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};