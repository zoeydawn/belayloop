import { combineReducers } from 'redux';

import auth from './auth';
import userInfo from './userInfo';
import userDetails from './userDetails';

export default combineReducers({
  auth,
  userInfo,
  userDetails,
});
