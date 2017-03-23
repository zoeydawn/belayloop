export default function messages(state = null, action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'RECEIVE_MESSAGES':
      // console.log('action.payload:', action.payload);
      return action.payload;
    default:
      return state;
  }
}
