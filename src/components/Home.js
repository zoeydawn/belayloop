import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';
import UserHome from './UserHome';

class Home extends Component {
  componentWillMount() {
    
  }
  render() {
    const { loggedIn } = this.props;
    const homePage = loggedIn ? <UserHome /> : <LandingPage />;
    return (
      <div>
        {homePage}
      </div>
    );
  }
}
const mapStateToProps = (state => ({
  loggedIn: state.auth.authenticated,
}));
export default connect(mapStateToProps)(Home);
