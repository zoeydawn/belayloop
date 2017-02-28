export default function conversation(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_CONVERSATION':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
