import { combineReducers } from 'redux';

import auth from './auth';
import userInfo from './userInfo';
import userDetails from './userDetails';
import messages from './messages';

export default combineReducers({
  auth,
  userInfo,
  userDetails,
  messages,
});
