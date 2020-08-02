import { UserActionType } from './user.types';

export const setCurrentUser = user => ({ //use into App.js for mapDispatchToProps
    type: UserActionType.SET_CURRENT_USER,
    payload: user
})