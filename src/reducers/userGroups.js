export default function userGroups(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_USER_GROUPS':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
