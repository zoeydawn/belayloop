export default function gyms(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_GYMS':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
