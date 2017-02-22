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

// EDIT USER INFO
// export function editUserInfo(obj) {
//   return (dispatch) => {
//     const user = firebaseAuth.currentUser;
//     // const user = firebaseAuth.getInstance().getCurrentUser();
//     console.log('user in editUserInfo:', user.providerData);
//   };
// }

// CHECK IF USER IS LOGGED IN
export function initAuth(dispatch) {
  // console.log('in initAuth');
  return new Promise((res, rej) => {
    firebaseAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          // console.log('user (in actions):', user);
          dispatch(initAuthSuccess(user));
        }
        res();
      },
      (error) => {
        dispatch(initAuthError(error));
        res();
      });
  });
}
