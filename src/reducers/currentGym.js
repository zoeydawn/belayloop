export default function currentGym(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_GYM':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
