import axios from 'axios';
import { firebaseAuth } from '../firebase';

function gotUser(data) {
  // console.log('data in gotUser:', data);
  return {
    type: 'GOT_USER',
    payload: data,
  };
}

function updatedUser(data) {
  console.log('data in updatedUser:', data);
  return {
    type: 'UPDATED_USER',
    payload: data,
  };
}

export function getUser(id) {
  return (dispatch) => {
    axios.get(`/api/users/${id}`)
      .then(res => dispatch(gotUser(res.data)))
      .catch(console.error);
  };
}

export function updateUser(obj) {
  // console.log('obj in updateUser:', obj);
  return (dispatch) => {
    firebaseAuth.currentUser.updateProfile(obj)
      // .then(() => axios.get(`/api/users/${firebaseAuth.currentUser.uid}`))
      .then(res => dispatch(updatedUser(firebaseAuth.currentUser)))
      .catch(console.error);
  };
}

//
// export function getOrUpdateUser(obj) {
//   return (dispatch) => {
//     axios.post('/api/users/', obj)
//       .then(res => dispatch(gotUser(res.data)))
//       .catch(console.error);
//   };
// }
//
// function gotUser(data) {
//   return {
//     type: 'GOT_USER',
//     payload: data,
//   };
// }
