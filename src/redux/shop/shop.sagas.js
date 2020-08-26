import  { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { 
    fetchCollectionsSuccess,
    fetchCollectionFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const collectionsSnapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, collectionsSnapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}