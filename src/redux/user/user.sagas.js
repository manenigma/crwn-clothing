import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionType from './user.types';
import { 
    signInSuccess, 
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from './user.actions';

import { 
    auth, 
    googleProvider, 
    createUserProfileDocument ,
    getCurrentUser
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userDocumentRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userDocumentSnapshot = yield userDocumentRef.get();
        yield put(signInSuccess({ id: userDocumentSnapshot.id, ...userDocumentSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user: userAuth } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user: userAuth } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenicated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
        console.log(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp(userCredentials) {
    const { payload: {email, password, displayName }} = userCredentials;
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionType.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionType.CHECK_USER_SESSION, isUserAuthenicated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionType.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionType.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionType.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}
