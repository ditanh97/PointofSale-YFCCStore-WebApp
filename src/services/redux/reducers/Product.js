const initialState = {
  productList: [],
  productDisplayList: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_PRODUCTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: action.payload.data.result, 
      };
    case 'GET_PRODUCT__FILTER_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_PRODUCT_FILTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_PRODUCT_FILTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productDisplayList: action.payload.data.result,
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        productDisplayList: [],
    };
    case 'POST_PRODUCT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
    case 'POST_PRODUCT_FULFILLED':
      const data = action.payload.data.result
      data.id = action.payload.data.response.insertId
      state.productList.push (data);
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: state.productList,
      };
    case 'UPDATE_PRODUCT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
    case 'UPDATE_PRODUCT_FULFILLED':
      const dataAfterPut = state.productList.map (product => {
        if (product.id === action.payload.data.result.id) {
          return action.payload.data.result;
        }
        return product;
      });
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: dataAfterPut,
      };
    case 'DELETE_PRODUCT_FULFILLED':
      const dataAfterDelete = state.productList.filter (
        product => product.id !== action.payload.data.result.id
      );
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: dataAfterDelete,
      };
    default:
      return state;
  }
};

export default product;
