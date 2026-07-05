import axios from "axios";
import API_URL from "../config/api";

// Register
export const register = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData
  );

  return response.data;
};

// Login
export const login = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    userData
  );

  return response.data;
};

// Get Logged-in User
export const getProfile = async (token) => {
  const response = await axios.get(
    `${API_URL}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};