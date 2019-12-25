const authHeader = ()  => {
    let user = localStorage.getItem('user');
    let jwt = localStorage.getItem('jwt');
    if (user && jwt) {
        return { "authorization": jwt };
    } else {
        return {};
    }
}


const logoutFunc = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
}

export {authHeader, logoutFunc};


//check empty object
export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


export const getCurrentDate = () => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}-${month<10?`0${month}`:`${month}`}-${date}`
}