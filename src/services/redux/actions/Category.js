import axios from 'axios';
import {authHeader} from '../../helpers'


export const getCategories = () => {
  const header = {
      headers: authHeader()
  };
  return {
    type: 'GET_CATEGORIES',
    payload: axios.get (`${process.env.REACT_APP_API_URL}/categories`, header),
  };
};

export const getCategory = (id) => {
  const header = {
      headers: authHeader()
  };
  return { 
      type: 'GET_CATEGORY',
      payload: axios.get (`${process.env.REACT_APP_API_URL}/categories/${id}`, header),
    };
  };


export const postCategory = (data) => {
  const header = {
    headers: authHeader()
  };
  return {
    type: 'POST_CATEGORY',
    payload: axios.post (`${process.env.REACT_APP_API_URL}/categories`, data, header),
  };
};
export const updateCategory = (id, data) => {
  const header = {
      headers: authHeader()
  };
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios.put (`${process.env.REACT_APP_API_URL}/categories/${id}`, data, header),
  };
  };

export const deleteCategory = (id) => {
  const header = {
    headers: authHeader()
  };
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete (`${process.env.REACT_APP_API_URL}/categories/${id}`, header),
  };
  };



