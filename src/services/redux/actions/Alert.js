/*
ACTION CREATORS FOR ACTION RELATED TO ALERTS/TOASTER NOTIFICATION
example: dispatch(success("You are login"))
*/


export const successAlert = (message) => {
    return { type: "SUCCESS", message };
}

export const errorAlert = (message) => {
    return { type: "ERROR", message };
}

export const infoAlert = (message) => {
    return { type: "INFO", message };
}

export const warningAlert = (message) => {
    return { type: "WARNING", message };
}

export const closeAlert = () => {
    return { type: "CLOSE"};
}

export const confirmWarning = () => {
    return { type: "CONFIRM"};
}

