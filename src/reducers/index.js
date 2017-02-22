import { combineReducers } from 'redux';

import auth from './auth';
import userInfo from './userInfo';

export default combineReducers({
  auth,
  userInfo,
});
