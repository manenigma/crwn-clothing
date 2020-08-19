import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collections-overview/conllection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections');

        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-db043/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections))

        collectionRef.get().then( (collectionsSnapshot) => {
            // console.log({collectionsSnapshot});
            const collectionsMap = convertCollectionsSnapshotToMap(collectionsSnapshot);
            // console.table(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false })
        });

    }

    render() {
        const {match } = this.props;
        const { loading } = this.state;
        
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                    render={(props) => WithSpinner(CollectionOverview)(loading, { ...props})} 
                />
                <Route path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} { ...props}  />} 
                />
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);