export default function loggedUser(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_LOGGED_USER':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
