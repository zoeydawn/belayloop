const initialState = {
  authenticated: false,
  user: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case 'INIT_AUTH_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      const { uid, email, displayName, photoURL } = payload;
      return Object.assign({}, state, {
        authenticated: true,
        // user: payload,
        user: { uid, email, displayName, photoURL },
      });
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}
