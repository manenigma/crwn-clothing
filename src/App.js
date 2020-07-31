import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component'
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // console.log('snapShot ',snapShot);
          this.setState( // set user state
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            });

            console.log(this.state)
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route path='/shop/hats' component={HatsPage} />
          <Route path='/signin' component={SignInAndSignOut} />
        </Switch>
      </div>
    );
  }
}

export default App;
 