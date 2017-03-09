export default function currentGroup(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_GROUP':
      return action.payload;
    default:
      return state;
  }
}
