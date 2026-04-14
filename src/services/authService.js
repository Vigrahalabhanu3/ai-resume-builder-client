// ============================================
// authService.js - Authentication API Calls
// ============================================
// Reference: fetch(), async/await - reference-javascript.md

import API from './api.js';

const register = async (name, email, password) => {
  const response = await API.post('/auth/register', { name, email, password });
  return response.data;
};

const emailLogin = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

const googleLogin = async (credential) => {
  const response = await API.post('/auth/google', { credential });
  return response.data;
};

const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

const logout = async () => {
  const response = await API.post('/auth/logout');
  return response;
};

export { register, emailLogin, googleLogin, getMe, logout };
