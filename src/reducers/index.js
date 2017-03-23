import { combineReducers } from 'redux';

import auth from './auth';
import userInfo from './userInfo';
import userDetails from './userDetails';
import loggedUser from './loggedUser';
import conversation from './conversation';
import gyms from './gyms';
import currentGym from './currentGym';
import groups from './groups';
import currentGroup from './currentGroup';
import posts from './posts';
import messages from './messages';

export default combineReducers({
  auth,
  userInfo,
  userDetails,
  loggedUser,
  conversation,
  gyms,
  currentGym,
  groups,
  currentGroup,
  posts,
  messages,
});
