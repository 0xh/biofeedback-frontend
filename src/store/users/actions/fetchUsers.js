import * as usersTypes from '../types';

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


export default () => async (dispatch, getState) => {
  const { token } = getState().user;
  dispatch(fetchUsersRequest());
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch('https://biofeedback-api.herokuapp.com/user',
    { headers });

  const response = await res.json();
  const ok = res.status >= 200 && res.status < 299;

  if (!ok) {
    dispatch(fetchUsersFailure(response.message));
    return;
  }
  dispatch(fetchUsersSuccess(response));
};
