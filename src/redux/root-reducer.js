import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({ // redux will combine this reducer into rootReducer
    user: userReducer,
    cart: cartReducer
})