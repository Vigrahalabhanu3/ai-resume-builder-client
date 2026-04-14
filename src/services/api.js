// ============================================
// api.js - Fetch Wrapper with Auth Token
// ============================================
// Reference: fetch(), async/await - reference-javascript.md

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Only set Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.response = { data, status: response.status };
    throw error;
  }

  return data;
};

const API = {
  get: (endpoint) => fetchApi(endpoint),

  post: (endpoint, body) => fetchApi(endpoint, {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body),
  }),

  put: (endpoint, body) => fetchApi(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  }),

  delete: (endpoint) => fetchApi(endpoint, {
    method: 'DELETE',
  }),
};

export default API;
