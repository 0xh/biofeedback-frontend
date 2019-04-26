import * as userTypes from '../types';

export const userLogout = () => ({
  type: userTypes.USER_LOGOUT,
});


export default () => (dispatch) => {
  dispatch(userLogout());
};
