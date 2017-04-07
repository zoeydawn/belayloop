import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { firebaseAuth } from '../firebase';

import Layout from './Layout';
// import Home from './Home';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Messages from './Messages';
import Conversation from './Conversation';
import Gyms from './Gyms';
import Gym from './Gym';
import Groups from './Groups';
import Group from './Group';
import Login from './Login';
import Discussion from './Discussion';

function authCheck(nextState, transition) {
  // console.log('nextState:', nextState);
  // console.log('transition:', transition);
  const user = firebaseAuth.currentUser;
  if (!user) {
    transition(`/login${nextState.location.pathname}`);
  }
}

export default class CustomRouter extends Component {
  render() {
    // console.log('firebaseAuth:', firebaseAuth);
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Gyms} />
          <Route path="/dashboard" component={Dashboard} onEnter={authCheck} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/messages" onEnter={authCheck} component={Messages} />
          <Route path="/conversation/:id/:otherPartyUid" component={Conversation} onEnter={authCheck} />
          <Route path="/gyms" component={Gyms} />
          <Route path="/gym/:id" component={Gym} />
          <Route path="/groups" component={Groups} />
          <Route path="/group/:id" component={Group} />
          <Route path="/login/:path" component={Login} />
          <Route path="/discussion/:id/:groupId" component={Discussion} />
        </Route>
      </Router>
    );
  }
}
