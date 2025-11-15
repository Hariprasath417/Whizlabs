// API configuration factory functions
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const createApiConfig = () => {
  const request = async (url, options = {}) => {
    const fullUrl = `${API_BASE_URL}${url}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(fullUrl, config);
      const data = await response.json();

      if (!response.ok || (data.success === false)) {
        throw new Error(data.error || data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get: (url) => request(url, { method: 'GET' }),
    post: (url, data) => request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    put: (url, data) => request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (url) => request(url, { method: 'DELETE' }),
  };
};

// API route constants
export const ITEMS_API_URL = '/items';

export { createApiConfig };

