import ShopActinTypes from './shop.types';

export const updateCollections = (collectionsMap) => ({
    type: ShopActinTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
})