import axios from "axios";
import API_URL from "../config/api";

// GET Orders
export const getOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

// ADD Order
export const addOrder = async (order) => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
};

// UPDATE Order
export const updateOrder = async (id, order) => {
  const response = await axios.put(
    `${API_URL}/orders/${id}`,
    order
  );
  return response.data;
};

// DELETE Order
export const deleteOrder = async (id) => {
  const response = await axios.delete(
    `${API_URL}/orders/${id}`
  );
  return response.data;
};