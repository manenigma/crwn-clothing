import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component'
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'

import './App.css';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

class App extends React.Component {
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // console.log('snapShot ',snapShot);
          setCurrentUser( // set user state
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            });

            // console.log(this.state)
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route path='/shop/hats' component={HatsPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? 
            (<Redirect to='/' />)
            : (<SignInAndSignOut />)
          } />
        </Switch>
      </div>
    );
  }
};

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
 