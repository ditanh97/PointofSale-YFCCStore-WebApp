export const authHeader = ()  => {
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


export const logoutFunc = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
}