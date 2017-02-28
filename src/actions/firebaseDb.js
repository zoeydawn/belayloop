import { firebaseDb, firebaseAuth } from '../firebase';

function receiveUser(user) {
  console.log('user:', user);
  return {
    type: 'RECEIVE_USER',
    payload: user,
  };
}

function receiveMessages(messages) {
  console.log('messages:', messages);
  return {
    type: 'RECEIVE_MESSAGES',
    payload: messages,
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

export function listenToMessages() {
  return (dispatch) => {
    console.log('in listenToMessages');
    const userRef = firebaseDb.ref('messages').child(firebaseAuth.currentUser.uid);
    userRef.off();
    userRef.on('value', (snapshot) => {
      const messages = snapshot.val();
      dispatch(receiveMessages(messages));
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

export function sendMessage(receiverId, message) {
  const { uid, displayName, photoURL } = firebaseAuth.currentUser;
  const userRef = firebaseDb.ref('messages').child(uid).child(receiverId);
  const receiverRef = firebaseDb.ref('messages').child(receiverId).child(uid);
  console.log('firebaseAuth.currentUser:', firebaseAuth.currentUser);
  userRef.push({
    message,
    sender: true,
    timestamp: Date.now(),
    read: true,
  });
  receiverRef.push({
    message,
    sender: false,
    timestamp: Date.now(),
    read: false,
    senderInfo: {
      displayName,
      photoURL,
      uid,
    },
  });
  return {
    type: 'MESSAGE_SENT',
    payload: message,
  };
}
