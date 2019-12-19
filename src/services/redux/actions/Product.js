import axios from 'axios';
import {authHeader} from '../../helpers'

export const getProducts = () => {
    // export const getCategory = (id,req) => {
  const header = {
    headers: authHeader()
  };  
  // const headers = {
  //   params: {
  //     order: req.order,
  //     sort: req.sorting,
  //     search: req.search
  //   },
//     headers: authHeader(),
// }
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get (`${process.env.REACT_APP_API_URL}/products`, header),
  };
};

export const getProductsById = (id) => {
    const header = {
      headers: authHeader()
    };  
    return { 
        type: 'GET_PRODUCT',
        payload: axios.get (`${process.env.REACT_APP_API_URL}/products/show/${id}`, header),
      };
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


  //query by:name, category, date order: ASC || DESC
export const sortProduct = (keyword, order) => {
    const ques = {
        "by":keyword, 
        "order": order
    }
    const header = {
      headers: authHeader()
    };  
    return {
      type: 'SORT_PRODUCTS',
      payload: axios.get (`${process.env.REACT_APP_API_URL}/products/sort`, {query: ques}, header),
    };
  };

  //query name
  export const searchProduct = (key) => {
    const ques = {
        "name":key,
    }
    const header = {
      headers: authHeader()
    };  
    return {
      type: 'SEARCH_PRODUCTS',
      payload: axios.get (`${process.env.REACT_APP_API_URL}/products/search`, {query: ques}, header),
    };
  };

    //query lim, p 
  export const getProductByPage = (limit, page) => {
    const ques = {
        "lim":limit, 
        "p": page
    }
    const header = {
      headers: authHeader()
    };  
    return {
      type: 'PAGING_PRODUCT',
      payload: axios.get (`${process.env.REACT_APP_API_URL}/products/page`, {query: ques}, header),
    };
  };