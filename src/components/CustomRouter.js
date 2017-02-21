import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import { firebaseAuth } from '../firebase';

import Layout from './Layout';

// function authCheck(nextState, transition) {
//   console.log('nextState:', nextState);
//   // console.log('transition:', transition);
//   const user = firebaseAuth.currentUser;
//   if (!user) {
//     transition('/signin');
//   }
// }

export default class CustomRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          {/* <IndexRoute component={Home} />
          <Route path="/detail/:id" component={ImageDetail} />
          <Route path="/search/:searchQuery" component={SearchResults} />
          <Route path="/dashboard" component={Dashboard} onEnter={authCheck} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/signin" component={SignIn} /> */}
        </Route>
      </Router>
    );
  }
}
