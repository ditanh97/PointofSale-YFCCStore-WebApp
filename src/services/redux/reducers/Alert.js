const initialState = {
    notification: '',
    variant: '',
    isAvailable: false,
    isConfirm: null,
};

const alert = (state = initialState, action) => {
    switch (action.type) {
        case "SUCCESS":
            return {
                ...state,
                notification: action.message,
                variant: 'success',

        };
        case "ERROR":
            return {
                ...state,
                notification: action.message,
                variant: 'error',
        };
        case "INFO":
            return {
                ...state,
                notification: action.message,
                variant: 'info',
        };
        case "WARNING":
            return {
                ...state,
                notification: action.message,
                variant: 'warning',
        };
        case "CONFIRM":
            return {
                ...state,
                isConfirm: true,
        };
        case "CLOSE":
            return {
                ...state,
                notification: '',
                variant: '',
                isConfirm: null,
        };
        default:
            return state;
    }

  };
  
  export default alert;