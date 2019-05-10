import { combineReducers } from 'redux';

import user from './user/reducers';
import users from './users/reducers';
import institutions from './institution/reducers';

export default combineReducers({
  user,
  users,
  institutions,
});
