import firebase from 'firebase';

import { firebaseAuth } from '../firebase';

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return authenticate(provider);
}

export function signInWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  return authenticate(provider);
}

function authenticate(provider) {
  return (dispatch) => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(err => dispatch(signInError(err)));
  };
}

function signInSuccess({ user }) {
  return {
    type: 'INIT_AUTH_SUCCESS',
    payload: user,
  };
}

function initAuthSuccess(user) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: user,
  };
}

function initAuthError(err) {
  console.error('initAuthError', err);
  return {
    type: 'INIT_AUTH_ERROR',
    payload: err,
  };
}

function signOutSuccess() {
  return {
    type: 'SIGN_OUT_SUCCESS',
  };
}

function signInError(err) {
  console.error('signInError', err);
  return {
    type: 'SIGN_IN_ERROR',
    payload: err,
  };
}

export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

// CHECK IF USER IS LOGGED IN
export function initAuth(dispatch) {
  // console.log('in initAuth');
  return new Promise((res, rej) => {
    // const unsub = firebaseAuth.onAuthStateChanged(
    firebaseAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          dispatch(initAuthSuccess(user));
        }
        // unsub();
        res();
      },
      (error) => {
        dispatch(initAuthError(error));
        res();
      });
  });
}
