/*
ACTION CREATORS FOR ACTION RELATED TO ALERTS/TOASTER NOTIFICATION
example: alert message "You are login"
*/

// export const alert = {
//     success,
//     error,
//     info,
//     warning,
//     close
// };

export function success(message) {
    return { type: "SUCCESS", message };
}

export function error(message) {
    return { type: "ERROR", message };
}

export function info(message) {
    return { type: "INFO", message };
}

export function warning(message) {
    return { type: "WARNING", message };
}

export function close() {
    return { type: "CLOSE"};
}

