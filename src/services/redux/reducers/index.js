import {combineReducers} from 'redux';

import product from './Product';
import category from './Category';
import admin from './Admin';
import alert from './Alert';
import upload from './Sample';
import transaction from './Transaction';

export const appReducer = combineReducers({
    product,
    category,
    admin,
    alert,
    transaction,
    upload,
});



