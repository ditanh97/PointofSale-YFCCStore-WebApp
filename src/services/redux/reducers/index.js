import {combineReducers} from 'redux';

import product from './product';
import category from './category';
import admin from './admin';

export const appReducer = combineReducers({
    product,
    category,
    admin,

});



