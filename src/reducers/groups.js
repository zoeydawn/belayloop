export default function groups(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_GROUPS':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
