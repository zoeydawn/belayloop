import { firebaseDb } from '../firebase';

function receiveUser(user) {
  console.log('user:', user);
  return {
    type: 'RECEIVE_USER',
    payload: user,
  };
}

export function startListeningToUser(userId) {
  return (dispatch) => {
    const userRef = firebaseDb.ref('users').child(userId);
    userRef.on('value', (snapshot) => {
      const user = snapshot.val();
      dispatch(receiveUser(user));
    });
  };
}

export function updateUser(obj) {
  
}
