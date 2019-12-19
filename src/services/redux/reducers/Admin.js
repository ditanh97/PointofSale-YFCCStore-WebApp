const initialState = {
    activeAdmin: "",
    isRegistered: false,
    isLogin: false,
    isRejected: false,
  };
  
  const admin = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REJECTED':
        return {
          ...state,
          isLogin: false,
          isRejected: true,
        };
      case 'LOGIN_FULFILLED':
        return {
          ...state,
          isLogin: true,
          isRejected: false,
          activeAdmin: action.payload.data,
        };
      case 'REGISTER_REJECTED':
        return {
          ...state,
          isRegistered: false,
          isRejected: true,
        };
      case 'REGISTER_FULFILLED':
        return {
          ...state,
          isRejected: false,
          isRegistered: true,
        };
      case 'LOGOUT_FULFILLED':
        return {
          ...state,
          isLogin: false 
        };
      default:
        return state;
    }
  };
  
  export default admin;