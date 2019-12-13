const initialState = {
	notification: null
};

const alert = (state = initialState, action) => {
    switch (action.type) {
        case "SUCCESS":
            return {
                notification: action.message
        };
        case "ERROR":
            return {
                notification: action.message
        };
        default:
            return state;
    }

  };
  
  export default alert;