const initialState = {
    categoryList: [],
    selectedCategory: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    isUploaded: false
  };
  
  const category = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CATEGORIES_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_CATEGORIES_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_CATEGORIES_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: action.payload.data.result, //CEK KEMBALI
        };
      case 'GET_CATEGORY_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_CATEGORY_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_CATEGORY_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: action.payload.data.result,
        };
      case 'POST_CATEGORY_REJECTED':
          return {
            ...state,
            isLoading: false,
            isRejected: true,
          };
      case 'POST_CATEGORY_FULFILLED':
        state.categoryList.push (action.payload.data.result);
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: state.categoryList,
        };
      case 'POST_IMAGE_CATEGORY_FULFILLED':
          return {
            
          }
      case 'UPDATE_CATEGORY_REJECTED':
          return {
            ...state,
            isLoading: false,
            isRejected: true,
          };
      case 'UPDATE_CATEGORY_FULFILLED':
        const dataAfterPut = state.categoryList.map (category => {
          if (category.id === action.payload.data.result.id) {
            console.log(action.payload.data.result, 'action payload')
            return action.payload.data.result;
          }
          return category;
        });
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: dataAfterPut,
        };
      case 'DELETE_CATEGORY_REJECTED':
          return {
            ...state,
            isLoading: false,
            isRejected: true,
          };
      case 'DELETE_CATEGORY_FULFILLED':
        const dataAfterDelete = state.categoryList.filter (
          category => category.id !== action.payload.data.result.id
        );
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: dataAfterDelete,
        };
      default:
        return state;
    }
  };
  
  export default category;
  