import axios from 'axios';

export const postImageCategory = (data) => {
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    return {
      type: 'POST_IMAGE_CATEGORY',
      payload: axios.post (`${process.env.REACT_APP_API_URL}/categories/upload`, data, header),
    };
  };