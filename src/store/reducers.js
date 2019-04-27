import { combineReducers } from 'redux';

import user from './user/reducers';
import users from './users/reducers';

export default combineReducers({
  user,
  users,
});
