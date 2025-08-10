import axios from 'axios';
import constants from '../redux/constants/constants';

const api = axios.create({
  baseURL: constants.URL_PRODUCTS,
});

export const getProducts = () => api.get('');
export const getProductById = (id) => api.get(`/${id}`);
export const addProduct = (product) => api.post('', product);
export const updateProduct = (id, product) => api.put(`/${id}`, product);
export const deleteProduct = (id) => api.delete(`/${id}`);
