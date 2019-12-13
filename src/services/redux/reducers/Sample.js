const initialState = {
    uploaded: {},
  };

  const upload = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_IMAGE_CATEGORY_FULFILLED':
            return {
                uploaded: action.payload.data.result
            }
        default:
            return state;
    }
  };
  
  export default upload;