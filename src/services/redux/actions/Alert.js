/*
ACTION CREATORS FOR ACTION RELATED TO ALERTS/TOASTER NOTIFICATION
example: alert message "You are login"
*/

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: "SUCCESS", message };
}

function error(message) {
    return { type: "ERROR", message };
}

function clear() {
    return { type: "CLEAR" };
}


// export const showNotification = (
// 	message: string,
// 	type: 'info' | 'success' | 'warning' | 'error' = 'info'
// ) => ({
// 	type: RootActions.SET_NOTIFICATION,
// 	payload: { message, type }
// });
