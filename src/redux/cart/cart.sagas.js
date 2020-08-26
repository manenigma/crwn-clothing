import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionType from '../user/user.types';
import { clearCart } from './cart.actions';

export function* cleatCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionType.SIGN_OUT_SUCCESS, cleatCartOnSignOut)
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ]);
}