import {combineReducers} from 'redux';

import product from './Product';
import category from './Category';
import admin from './Admin';
import alert from './Alert';

export const appReducer = combineReducers({
    product,
    category,
    admin,
    alert,

});



