import * as usersTypes from '../types';
import fetchUsers from '../../../api/users/fetchUsers';

export const fetchUsersRequest = () => ({
  type: usersTypes.FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = users => ({
  type: usersTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = error => ({
  type: usersTypes.FETCH_USERS_FAILURE,
  error,
});


export default () => async (dispatch) => {
  dispatch(fetchUsersRequest());

  const usersResponse = await fetchUsers();


  if (usersResponse instanceof Error) {
    dispatch(fetchUsersFailure(usersResponse.message));
    return;
  }
  dispatch(fetchUsersSuccess(usersResponse));
};
