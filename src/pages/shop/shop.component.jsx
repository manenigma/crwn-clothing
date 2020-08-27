import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fecthCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({ fecthCollectionsStart, match }) => {
    useEffect(() => {
        fecthCollectionsStart();
    }, [fecthCollectionsStart])
        
    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} 
                component={CollectionsOverviewContainer} 
            />
            <Route path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer} 
            />
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
    fecthCollectionsStart: () => dispatch(fecthCollectionsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);