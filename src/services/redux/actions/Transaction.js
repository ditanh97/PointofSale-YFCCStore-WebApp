import axios from 'axios';
import {authHeader} from '../../helpers';

export const checkoutSell = (data) => {
    const header = {
        headers : authHeader()
    }
    return {
        type: 'CHECKOUT_SELL',
        payload: axios.post(`${process.env.PUBLIC_URL}/transaction`, data, header)
    };
};

export const cartChange = (product) => {
    return {
        type: 'CART_CHANGE',
        product,
    };
};

export const addCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        product
    };
};


export const removeCart = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        id,
    };
};