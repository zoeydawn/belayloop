import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { firebaseAuth } from '../firebase';

import Layout from './Layout';
import Home from './Home';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Messages from './Messages';
import Conversation from './Conversation';
import Gyms from './Gyms';
import Gym from './Gym';
import Groups from './Groups';

function authCheck(nextState, transition) {
  // console.log('nextState:', nextState);
  // console.log('transition:', transition);
  const user = firebaseAuth.currentUser;
  if (!user) {
    transition('/signin');
  }
}

export default class CustomRouter extends Component {
  render() {
    // console.log('firebaseAuth:', firebaseAuth);
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="/dashboard" component={Dashboard} onEnter={authCheck} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/messages" component={Messages} />
          <Route path="/conversation/:id" component={Conversation} />
          <Route path="/gyms" component={Gyms} />
          <Route path="/gym/:id" component={Gym} />
          <Route path="/groups" component={Groups} />
          {/* <Route path="/gym/:id" component={Gym} /> */}
        </Route>
      </Router>
    );
  }
}
