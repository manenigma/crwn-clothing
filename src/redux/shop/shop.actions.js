import ShopActionTypes from './shop.types';

export const fecthCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage =>({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

// export const fecthCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
        
//         dispatch(fecthCollectionsStart());

//         collectionRef.get()
//         .then( (collectionsSnapshot) => {
//             // console.log({collectionsSnapshot});
//             const collectionsMap = convertCollectionsSnapshotToMap(collectionsSnapshot);
//             // console.table(collectionsMap);
//             dispatch(fetchCollectionsSuccess(collectionsMap));
//         })
//         .catch( error => dispatch(fetchCollectionFailure(error.message)));

//     };
// }
