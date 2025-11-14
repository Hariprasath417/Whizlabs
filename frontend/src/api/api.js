// Item API functions
import { createApiConfig } from "../config";
import { ITEMS_API_URL } from "../routes";

const apiConfig = createApiConfig();

export const getItems = (category = '') => {
  const url = category ? `${ITEMS_API_URL}?category=${category}` : ITEMS_API_URL;
  return apiConfig.get(url);
};

export const getItem = (id) => apiConfig.get(`${ITEMS_API_URL}/${id}`);

export const postItem = (data) => apiConfig.post(ITEMS_API_URL, data);

export const editItem = (id, data) => apiConfig.put(`${ITEMS_API_URL}/${id}`, data);

export const deleteItem = (id) => apiConfig.delete(`${ITEMS_API_URL}/${id}`);
