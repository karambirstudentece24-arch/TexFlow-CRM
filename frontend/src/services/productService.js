import axios from "axios";

const API_URL = "http://localhost:8000/api/products";

// GET All Products
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ADD Product
export const addProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

// UPDATE Product
export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

// DELETE Product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};