import * as userTypes from '../types';
import userApi from '../../../api/user';

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
  const res = await userApi.userLogin(tokenBlob);

  if (res instanceof Error) {
    dispatch(userLoginFailure(res.message));
  } else {
    dispatch(userLoginSuccess(res));
  }
};
