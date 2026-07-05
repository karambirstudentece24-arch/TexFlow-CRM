import axios from "axios";
import API_URL from "../config/api";

// GET Customers
export const getCustomers = async () => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

// ADD Customer
export const addCustomer = async (customer) => {
  const response = await axios.post(`${API_URL}/customers`, customer);
  return response.data;
};

// UPDATE Customer
export const updateCustomer = async (id, customer) => {
  const response = await axios.put(
    `${API_URL}/customers/${id}`,
    customer
  );
  return response.data;
};

// DELETE Customer
export const deleteCustomer = async (id) => {
  const response = await axios.delete(
    `${API_URL}/customers/${id}`
  );
  return response.data;
};