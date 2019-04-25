import * as userTypes from '../types';

export const userLoginRequest = () => ({
  type: userTypes.USER_LOGIN_REQUEST,
});

export const userLoginSuccess = jwt => ({
  type: userTypes.USER_LOGIN_SUCCESS,
  payload: jwt,
});

export const userLoginFailure = error => ({
  type: userTypes.USER_LOGIN_FAILURE,
  error,
});


export default accessToken => async (dispatch) => {
  dispatch(userLoginRequest());

  const tokenBlob = new Blob(
    [JSON.stringify({ access_token: accessToken }, null, 2)],
    { type: 'application/json' },
  );
  const options = {
    method: 'POST',
    body: tokenBlob,
  };
  const response = await fetch('https://biofeedback-api.herokuapp.com/auth/google', options);
  const body = await response.json();
  if (body && body.jwt) {
    dispatch(userLoginSuccess(body.jwt));
  } else {
    dispatch(userLoginFailure('error'));
  }
};
