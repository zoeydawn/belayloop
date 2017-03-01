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

function receiveConversation(con) {
  // console.log('user:', user);
  return {
    type: 'RECEIVE_CONVERSATION',
    payload: con,
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
      const user = snapshot.val();
      dispatch(receiveLoggedUser(user));
    });
  };
}

export function listenToConversation(id) {
  return (dispatch) => {
    console.log('in listenToConversation');
    const ref = firebaseDb.ref('conversations').child(id);
    ref.off();
    ref.on('value', (snapshot) => {
      const con = snapshot.val();
      console.log('con:', con);
      dispatch(receiveConversation(con));
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

export function sendMessage(conversationId, obj) {
  const userRef = firebaseDb.ref('conversations').child(conversationId);
  userRef.push(obj);

  return {
    type: 'SENT_MESSAGE',
    payload: obj,
  };
}

export function startConversation(receiverObj, messageObj) {
  const { message, subject } = messageObj;
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
    subject,
    read: true,
  });
  receiverRef.set({
    uid,
    displayName,
    photoURL,
    subject,
    read: false,
  });
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
