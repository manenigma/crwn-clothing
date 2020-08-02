import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

export default combineReducers({ // redux will combine this reducer into rootReducer
    user: userReducer
})