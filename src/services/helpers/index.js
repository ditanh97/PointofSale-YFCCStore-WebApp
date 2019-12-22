const authHeader = ()  => {
    let user = localStorage.getItem('user');
    let jwt = localStorage.getItem('jwt');
    console.log('user', user);
    console.log('jwt', jwt);

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