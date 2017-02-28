import uuidV1 from 'uuid/v1';

import { firebaseDb, firebaseAuth } from '../firebase';

function receiveUser(user) {
  console.log('user:', user);
  return {
    type: 'RECEIVE_USER',
    payload: user,
  };
}

function receiveLoggedUser(user) {
  // console.log('user:', user);
  return {
    type: 'RECEIVE_LOGGED_USER',
    payload: user,
  };
}

export function startListeningToUser(userId) {
  return (dispatch) => {
    const userRef = firebaseDb.ref('users').child(userId);
    userRef.off();
    userRef.on('value', (snapshot) => {
      const user = snapshot.val();
      dispatch(receiveUser(user));
    });
  };
}

export function listenToLoggedUser() {
  return (dispatch) => {
    // console.log('in listenToLoggedUser');
    const userRef = firebaseDb.ref('users').child(firebaseAuth.currentUser.uid);
    userRef.off();
    userRef.on('value', (snapshot) => {
      const messages = snapshot.val();
      dispatch(receiveLoggedUser(messages));
    });
  };
}

export function updateUserInfo(userId, obj) {
  const userRef = firebaseDb.ref('users').child(userId);
  userRef.set(obj);

  return {
    type: 'UPDATE_USER_INFO',
    payload: obj,
  };
}

export function startConversation(receiverObj, message) {
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  const conversationId = uuidV1();
  const userRef = firebaseDb.ref('users').child(uid).child('messages').child(conversationId);
  const receiverRef = firebaseDb.ref('users').child(receiverObj.uid).child('messages').child(conversationId);
  const conversationRef = firebaseDb.ref('conversations').child(conversationId);
  console.log('conversationId:', conversationId);
  userRef.set({
    uid: receiverObj.uid,
    displayName: receiverObj.displayName,
    photoURL: receiverObj.photoURL,
    subject: '[no subject]',
  });
  // userRef.set({
  //   details: {
  //     uid: receiverObj.uid,
  //     displayName: receiverObj.displayName,
  //     photoURL: receiverObj.photoURL,
  //   },
  //   0: {
  //     message,
  //     timestamp: Date.now(),
  //     read: true,
  //     uid,
  //     displayName,
  //     photoURL,
  //   },
  // });
  receiverRef.set({
    uid,
    displayName,
    photoURL,
    subject: '[no subject]',
  });
  // receiverRef.set({
  //   details: {
  //     uid,
  //     displayName,
  //     photoURL,
  //   },
  //   0: {
  //     message,
  //     timestamp: Date.now(),
  //     read: false,
  //     uid,
  //     displayName,
  //     photoURL,
  //   },
  // });
  conversationRef.push({
    message,
    timestamp: Date.now(),
    uid,
    displayName,
    photoURL,
  });
  return {
    type: 'MESSAGE_SENT',
    payload: message,
  };
}
