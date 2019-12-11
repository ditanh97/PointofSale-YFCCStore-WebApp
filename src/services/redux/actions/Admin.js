import axios from 'axios';
import {logoutFunc} from '../../helpers'

export const login = (content) => {
const data = {
    username: content.username,
    password: content.password,
}
return {
    type: 'LOGIN',
    payload: axios.post (`${process.env.REACT_APP_API_URL}/login`, data), 
};
};

export const logout = () => {
    return {
        type: 'LOGOUT',
        payload: logoutFunc()
    };
    };


export const register = (username, password, email) => {
const data = {
    username: username,
    password: password,
    email: email,
}
return {
    type: 'REGISTER',
    payload: axios.post (`${process.env.REACT_APP_API_URL}/register`, data), 
};
};