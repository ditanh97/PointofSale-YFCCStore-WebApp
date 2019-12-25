import axios from 'axios';
import {authHeader} from '../../helpers';

export const checkoutSell = (data) => {
    const header = {
        headers : authHeader()
    }
    return {
        type: 'CHECKOUT_SELL',
        payload: axios.post(`${process.env.REACT_APP_API_URL}/transaction`, data, header)
    };
};

export const getRecentBill = (id) => {
    const header = {
        headers : authHeader()
    }
    return {
        type: 'RECENT_BILL',
        payload: axios.get(`${process.env.REACT_APP_API_URL}/transaction/receipt/${id}`, header)
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

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}

export const clearBill = () => {
    return {
        type: 'CLEAR_BILL'
    }
}

export const setPrice = (price) => {
    return {
        type: 'SET_TOTAL_PRICE',
        price,
    };
};