export default function posts(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_POSTS':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
