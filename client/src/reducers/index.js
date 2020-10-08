import { combineReducers } from 'redux';

import user from './user';
import auth from './auth';
import notification from './notification';

/* root reducer */
export default combineReducers({
  user,
  auth,
  notification
});