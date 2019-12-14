const initialState = {
    uploaded: {},
    isRejected: false,
    error: {}
  };

  const upload = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_IMAGE_CATEGORY_FULFILLED':
            return {
                ...state,
                uploaded: action.payload.data.result
            }
        case 'POST_IMAGE_CATEGORY_REJECTED':
            return {
                ...state,
                isRejected: true,
                error: action.payload.data.result
            }
        default:
            return state;
    }
  };
  
  export default upload;