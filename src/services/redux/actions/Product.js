import axios from 'axios';
import {authHeader} from '../../helpers'

export const getProducts = () => {
  const header = {
    headers: authHeader()
  };  
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get (`${process.env.REACT_APP_API_URL}/products`, header),
  };
};

export const getProductsByFilter = (req) => {
  const header = {
    params: {
      catId: req.catId
    },
    headers: authHeader(),
  }
    return { 
        type: 'GET_PRODUCT_FILTER',
        payload: axios.get (`${process.env.REACT_APP_API_URL}/products`, header),
      };
  };

export const clearFilter = () => {
    return {type: 'CLEAR_FILTER'};
};

export const postProduct = (data) => {
  const header = {
    headers: authHeader()
  };  
  return {
    type: 'POST_PRODUCT',
    payload: axios.post (`${process.env.REACT_APP_API_URL}/products`, data, header),
  };
};

export const updateProduct = (id, data) => {
    const header = {
      headers: authHeader()
    };  
    return {
      type: 'UPDATE_PRODUCT',
      payload: axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, data, header),
    };
  };

export const deleteProduct = (id) => {
    const header = {
      headers: authHeader()
    };  
    return {
      type: 'DELETE_PRODUCT',
      id,
      payload: axios.delete (`${process.env.REACT_APP_API_URL}/products/${id}`, header),
    };
  };
