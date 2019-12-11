import {combineReducers} from 'redux';

import product from './Product';
import category from './Category';
import admin from './Admin';

export const appReducer = combineReducers({
    product,
    category,
    admin,

});



