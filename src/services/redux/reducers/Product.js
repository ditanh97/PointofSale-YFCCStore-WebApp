//dalam file terdiri semua evaluasi terhadap action yang dinyatakan spt, fetching post dan creating a new post
const initialState = {
  productList: [],
  productById: '',
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
        productList: action.payload.data.result, //CEK KEMBALI
      };
    case 'GET_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_PRODUCT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productById: action.payload.data.result,
      };
    case 'POST_PRODUCT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
    case 'POST_PRODUCT_FULFILLED':
      state.productList.push (action.payload.data.result);
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
    case 'SORT_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'SORT_PRODUCTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: action.payload.data.result, //CEK KEMBALI
      };
    case 'SEARCH_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'SEARCH_PRODUCTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: action.payload.data.result, //CEK KEMBALI
      };
    case 'PAGING_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'PAGING_PRODUCT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: action.payload.data.result, //CEK KEMBALI
      };
    default:
      return state;
  }
};

export default product;
