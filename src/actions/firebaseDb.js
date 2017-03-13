import uuidV1 from 'uuid/v1';

import { firebaseDb, firebaseAuth } from '../firebase';

function receiveUser(user) {
  // console.log('user in receiveUser:', user);
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

function receiveGyms(data) {
  return {
    type: 'RECEIVE_GYMS',
    payload: data,
  };
}

function receiveGym(data) {
  return {
    type: 'RECEIVE_GYM',
    payload: data,
  };
}

function receiveGroups(data) {
  return {
    type: 'RECEIVE_GROUPS',
    payload: data,
  };
}

function receiveGroup(data) {
  // console.log('group data:', data);
  return {
    type: 'RECEIVE_GROUP',
    payload: data,
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
    // console.log('in listenToConversation');
    const ref = firebaseDb.ref('conversations').child(id);
    ref.off();
    ref.on('value', (snapshot) => {
      const con = snapshot.val();
      // console.log('con:', con);
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

export function sendMessage(conversationId, obj, uid) {
  const conRef = firebaseDb.ref('conversations').child(conversationId);
  const userRef = firebaseDb.ref('users').child(uid).child('messages').child(conversationId).child('read');
  conRef.push(obj);
  userRef.set(false);

  return {
    type: 'SENT_MESSAGE',
    payload: obj,
  };
}

export function markAsRead(conversationId) {
  const { uid } = firebaseAuth.currentUser;
  const userRef = firebaseDb.ref('users').child(uid).child('messages').child(conversationId).child('read');
  userRef.set(true);

  return {
    type: 'MARKED_AS_READ',
    payload: conversationId,
  };
}

function addMessageToUserRef(conversationId, userId, messageObj) {
  return new Promise((res, rej) => {
    const newRef = firebaseDb.ref('users').child(userId).child('messages').child(conversationId).set(messageObj);
    if (newRef) {
      res(conversationId);
    } else {
      rej('Write operation failed');
    }
  });
}

function addMessageToConversationRef(messageObj) {
  return new Promise((res, rej) => {
    const conversationRef = firebaseDb.ref('conversations').push(messageObj);
    if (conversationRef) {
      res(conversationRef.key);
    } else {
      rej('Write to conversationRef failed');
    }
  });
}

export function startConversation(receiverObj, messageObj) {
  const { message, subject } = messageObj;
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  // const conversationId = uuidV1();
  // const userRef = firebaseDb.ref('users').child(uid).child('messages').child(conversationId);
  // const receiverRef = firebaseDb.ref('users').child(receiverObj.uid).child('messages').child(conversationId);
  // const conversationRef = firebaseDb.ref('conversations').child(conversationId);
  // console.log('conversationId:', conversationId);
  const conObj = {
    0: {
      message,
      timestamp: Date.now(),
      uid,
      displayName,
      photoURL,
    },
  };
  const userObj = {
    uid: receiverObj.uid,
    displayName: receiverObj.displayName,
    photoURL: receiverObj.photoURL,
    subject,
    read: true,
  };
  const recObj = {
    uid,
    displayName,
    photoURL,
    subject,
    read: false,
  };
  addMessageToConversationRef(conObj)
    .then(newConKey => addMessageToUserRef(newConKey, uid, userObj))
    .then(conversationKey => addMessageToUserRef(conversationKey, receiverObj.uid, recObj))
    .catch(console.error);


  // userRef.set({
  //   uid: receiverObj.uid,
  //   displayName: receiverObj.displayName,
  //   photoURL: receiverObj.photoURL,
  //   subject,
  //   read: true,
  // });
  // receiverRef.set({
  //   uid,
  //   displayName,
  //   photoURL,
  //   subject,
  //   read: false,
  // });
  // conversationRef.push({
  //   message,
  //   timestamp: Date.now(),
  //   uid,
  //   displayName,
  //   photoURL,
  // });
  return {
    type: 'MESSAGE_SENT',
    payload: message,
  };
}

export function addGym(obj) {
  const ref = firebaseDb.ref('gyms');
  ref.push(obj);

  return {
    type: 'GYM_ADDED',
    payload: obj,
  };
}

export function listenToGyms() {
  return (dispatch) => {
    // console.log('in listenToGyms');
    const ref = firebaseDb.ref('gyms');
    ref.off();
    ref.on('value', (snapshot) => {
      const gyms = snapshot.val();
      // console.log('gyms:', gyms);
      dispatch(receiveGyms(gyms));
    });
  };
}

export function listenToGym(id) {
  return (dispatch) => {
    // console.log('in listenToGyms');
    const ref = firebaseDb.ref('gyms').child(id);
    ref.off();
    ref.on('value', (snapshot) => {
      const gym = snapshot.val();
      // console.log('gyms:', gyms);
      dispatch(receiveGym(gym));
    });
  };
}

export function addGroup(groupObj) {
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  const obj = {
    name: groupObj.name,
    description: groupObj.description,
    leader: {
      uid,
      displayName,
      photoURL,
    },
    members: {
      [uid]: {
        displayName,
        photoURL,
      },
    },
  };
  const groupId = uuidV1();
  const groupRef = firebaseDb.ref('groups').child(groupId);
  const userRef = firebaseDb.ref('users').child(uid).child('groups').child(groupId);

  groupRef.set(obj);
  userRef.set(groupObj);

  return {
    type: 'GROUP_ADDED',
    payload: obj,
  };
}

export function listenToGroups() {
  return (dispatch) => {
    // console.log('in listenToGroups');
    const ref = firebaseDb.ref('groups');
    ref.off();
    ref.on('value', (snapshot) => {
      const groups = snapshot.val();
      // console.log('groups:', groups);
      dispatch(receiveGroups(groups));
    });
  };
}

export function listenToGroup(id) {
  return (dispatch) => {
    const ref = firebaseDb.ref('groups').child(id);
    ref.off();
    ref.on('value', (snapshot) => {
      const group = snapshot.val();
      dispatch(receiveGroup(group));
    });
  };
}

export function joinGroup(obj) {
  const { name, id, description } = obj;
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  const groupRef = firebaseDb.ref('groups').child(id).child('members').child(uid);
  const userRef = firebaseDb.ref('users').child(uid).child('groups').child(id);
  const newMember = { displayName, photoURL };
  const groupObj = { name, description };
  groupRef.set(newMember);
  userRef.set(groupObj);

  return {
    type: 'JOINED_GROUP',
    payload: id,
  };
}

export function leaveGroup(groupId) {
  const { uid } = firebaseAuth.currentUser;
  const groupRef = firebaseDb.ref('groups').child(groupId).child('members').child(uid);
  const userRef = firebaseDb.ref('users').child(uid).child('groups').child(groupId);
  groupRef.remove();
  userRef.remove();

  return {
    type: 'GROUP_REMOVED',
    payload: groupId,
  };
}

export function startGroupDiscussion(groupId, obj) {
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  const { title, initialComment } = obj;
  // const conversationId = uuidV1();
  const groupRef = firebaseDb.ref('groups').child(groupId).child('discussions');
  // const conversationRef = firebaseDb.ref('conversations').child(conversationId);
  console.log('groupId:', groupId);
  groupRef.push({
    title,
    initialComment,
    uid,
    displayName,
    photoURL,
    timestamp: Date.now(),
  });

  return {
    type: 'DISCUSSION_STARTED',
    payload: obj,
  };
}
