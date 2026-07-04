import axios from "axios";

const API_URL = "http://localhost:8000/api/customers";

// GET Customers
export const getCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ADD Customer
export const addCustomer = async (customer) => {
  const response = await axios.post(API_URL, customer);
  return response.data;
};

// UPDATE Customer
export const updateCustomer = async (id, customer) => {
  const response = await axios.put(`${API_URL}/${id}`, customer);
  return response.data;
};

// DELETE Customer
export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};