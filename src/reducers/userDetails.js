export default function userInfo(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_USER':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
