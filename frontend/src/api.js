import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Helper to get JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch threats with optional query params
export const fetchThreats = async (params) => {
  const response = await axios.get(`${BASE_URL}/threats`, { params });
  return response.data;
};

// Fetch threat by ID
export const fetchThreatById = async (id) => {
  const response = await axios.get(`${BASE_URL}/threats/${id}`);
  return response.data;
};

// Fetch threat stats
export const fetchStats = async () => {
  const response = await axios.get(`${BASE_URL}/threats/stats`);
  return response.data;
};

// 🔐 Register new user
export const registerUser = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/register`, { username, password });
  return response.data;
};

// 🔐 Login user
export const loginUser = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { username, password });
  return response.data; 
};

// 🔐 Secure Threat Analysis (requires token)
export const analyzeThreat = async (description) => {
  const response = await axios.post(
    `${BASE_URL}/analyze`,
    { description },
    { headers: getAuthHeaders() }
  );
  return response.data; 
};

