import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Auth from './Auth';

import { signInWithGoogle, signInWithFacebook } from '../actions/auth';

class Login extends Component {

  _googleSignIn = () => {
    const { signInWithGoogle } = this.props;
    signInWithGoogle();
    browserHistory.push('/');
    // browserHistory.push(`/${this.props.params.path}`);
  }

  render() {
    return (
      <div>
        <h1>Sign in to BelayLoop:</h1>
        <Auth googleSignIn={this._googleSignIn} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signInWithGoogle() {
    dispatch(signInWithGoogle());
  },
  signInWithFacebook() {
    dispatch(signInWithFacebook());
  },
});

export default connect(null, mapDispatchToProps)(Login);
