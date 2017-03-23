import { firebaseDb, firebaseAuth } from '../firebase';

function receiveMessages(messages) {
  // console.log('messages in receiveUser:', messages);
  return {
    type: 'RECEIVE_MESSAGES',
    payload: messages,
  };
}

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

function receivePosts(data) {
  // console.log('group data:', data);
  return {
    type: 'RECEIVE_POSTS',
    payload: data,
  };
}

export function listenToMessages() {
  const { uid } = firebaseAuth.currentUser;
  return (dispatch) => {
    const userRef = firebaseDb.ref('userMessages').child(uid);
    userRef.off();
    userRef.on('value', (snapshot) => {
      const user = snapshot.val();
      dispatch(receiveMessages(user));
    });
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
    const ref = firebaseDb.ref('conversations').child(id);
    ref.off();
    ref.on('value', (snapshot) => {
      const con = snapshot.val();
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

function addMessageToConversation(conId, messageObj) {
  return new Promise((res, rej) => {
    const conversationRef = firebaseDb.ref('conversations').child(conId).push(messageObj);
    if (conversationRef) {
      res(conversationRef.key);
    } else {
      rej('Write to conversationRef failed');
    }
  });
}

export function sendMessage(conversationId, obj, uid) {
  const userRef = firebaseDb.ref('userMessages').child(uid).child(conversationId).child('read');
  // console.log('in sendMessage');
  addMessageToConversation(conversationId, obj)
    .then(() => userRef.set(false))
    .catch(error => console.error('error in sendMessage:', error));

  return {
    type: 'SENT_MESSAGE',
    payload: obj,
  };
}

export function markAsRead(conversationId) {
  const { uid } = firebaseAuth.currentUser;
  const userRef = firebaseDb.ref('userMessages').child(uid).child(conversationId).child('read');
  userRef.set(true);

  return {
    type: 'MARKED_AS_READ',
    payload: conversationId,
  };
}

function addConversationToUserRef(conversationId, userId, messageObj) {
  return new Promise((res, rej) => {
    const newRef = firebaseDb.ref('userMessages').child(userId).child(conversationId).set(messageObj);
    if (newRef) {
      res(conversationId);
    } else {
      rej('Write operation failed');
    }
  });
}

function createNewConversation(messageObj) {
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
  // console.log('in startConversation');
  const { message, subject } = messageObj;
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
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
  createNewConversation(conObj)
    .then(newConKey => addConversationToUserRef(newConKey, uid, userObj))
    .then(conversationKey => addConversationToUserRef(conversationKey, receiverObj.uid, recObj))
    .catch(console.error);

  return {
    type: 'MESSAGE_SENT',
    payload: message,
  };
}

export function joinPost(receiverObj, messageObj) {
  // console.log('in joinPost');
  const { message, subject } = messageObj;
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
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
    subject: `You are climbing with ${receiverObj.displayName} on ${subject}!`,
    read: true,
  };
  const recObj = {
    uid,
    displayName,
    photoURL,
    subject: `${displayName} is joining you on ${subject}!`,
    read: false,
  };
  createNewConversation(conObj)
    .then(newConKey => addConversationToUserRef(newConKey, uid, userObj))
    .then(conversationKey => addConversationToUserRef(conversationKey, receiverObj.uid, recObj))
    .catch(console.error);

  return {
    type: 'MESSAGE_SENT',
    payload: message,
  };
}

function addPost(postObj, userId) {
  return new Promise((res, rej) => {
    const postRef = firebaseDb.ref('posts').child(userId).push(postObj);
    if (postRef) {
      res(postRef.key);
    } else {
      rej('Write to postRef failed');
    }
  });
}

export function createNewPost(obj) {
  const { id } = obj.gym;
  const postObj = obj;
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  postObj.user = { uid, displayName, photoURL };
  // console.log('postObj:', postObj);
  addPost(postObj, uid)
    .then((newPostKey) => {
      const ref = firebaseDb.ref('posts').child(id).child(newPostKey);
      ref.set(postObj);
    })
    .catch(err => console.error('error creating post', err));

  return {
    type: 'POST_ADDED',
    payload: postObj,
  };
}

export function listenToPosts(id) {
  return (dispatch) => {
    const ref = firebaseDb.ref('posts').child(id);
    ref.off();
    ref.on('value', (snapshot) => {
      const posts = snapshot.val();
      // console.log('posts:', posts);
      dispatch(receivePosts(posts));
    });
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

function addNewGroupRef(groupObj, groupId) {
  return new Promise((res, rej) => {
    const groupRef = firebaseDb.ref('groups').child(groupId).set(groupObj);
    if (groupRef) {
      res(groupId);
    } else {
      rej('Write to groupRef failed');
    }
  });
}

function addGroupDetails(groupObj) {
  return new Promise((res, rej) => {
    const groupRef = firebaseDb.ref('groupDetails').push(groupObj);
    if (groupRef) {
      res(groupRef.key);
    } else {
      rej('Write to groupRef failed');
    }
  });
}

function addGroupToUser(groupId, userId, groupObj) {
  return new Promise((res, rej) => {
    const userRef = firebaseDb.ref('userGroups').child(userId).child(groupId).set(groupObj);
    if (userRef) {
      res(userRef);
    } else {
      rej('Write to userRef failed');
    }
  });
}

function addUserToGroup(groupId, userId, memberObj) {
  return new Promise((res, rej) => {
    const groupRef = firebaseDb.ref('groupDetails').child(groupId).child('members').child(userId).set(memberObj);
    if (groupRef) {
      res(groupRef);
    } else {
      rej('Write to groupRef failed');
    }
  });
}

export function addGroup(groupObj) {
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  // console.log('groupObj:', groupObj);

  const detailObj = {
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

  addGroupDetails(detailObj)
  .then(newGroupId => addNewGroupRef(groupObj, newGroupId))
  .then(groupId => addGroupToUser(groupId, uid, groupObj))
  .catch(err => console.error('Error adding group:', err));

  return {
    type: 'GROUP_ADDED',
    payload: groupObj,
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
    const ref = firebaseDb.ref('groupDetails').child(id);
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
  // const groupRef = firebaseDb.ref('groupDetails').child(id).child('members').child(uid);
  // const userRef = firebaseDb.ref('userGroups').child(uid).child('groups').child(id);
  const newMember = { displayName, photoURL };
  const groupObj = { name, description };

  addUserToGroup(id, uid, newMember)
    .then(() => addGroupToUser(id, uid, groupObj))
    .catch(err => console.log('error adding user to group', err));

  return {
    type: 'JOINED_GROUP',
    payload: id,
  };
}

export function leaveGroup(groupId) {
  const { uid } = firebaseAuth.currentUser;
  const groupRef = firebaseDb.ref('groupDetails').child(groupId).child('members').child(uid);
  const userRef = firebaseDb.ref('userGroups').child(uid).child('groups').child(groupId);
  userRef.remove();
  groupRef.remove();

  return {
    type: 'GROUP_REMOVED',
    payload: groupId,
  };
}

export function addMessageToDiscussion(conversationId, obj) {
  addMessageToConversation(conversationId, obj)
    .catch(error => console.error('error in addMessageToDiscussion:', error));

  return {
    type: 'SENT_MESSAGE',
    payload: obj,
  };
}

export function startGroupDiscussion(groupId, obj) {
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  const { title, initialComment } = obj;

  const messageObj = {
    0: {
      displayName,
      uid,
      photoURL,
      message: initialComment,
      timestamp: Date.now(),
    },
  };

  createNewConversation(messageObj)
    .then((conId) => {
      const groupRef = firebaseDb.ref('groupDetails').child(groupId).child('discussions').child(conId);
      groupRef.set({
        title,
        // initialComment,
        uid,
        displayName,
        photoURL,
        timestamp: Date.now(),
      });
    })
    .catch(err => console.error('error creating group discussion', err));

  return {
    type: 'DISCUSSION_STARTED',
    payload: obj,
  };
}
