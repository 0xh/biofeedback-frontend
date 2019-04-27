import jwt from 'jsonwebtoken';
import * as userTypes from '../types';

const initialState = {
  token: undefined,
  isFetching: false,
  error: undefined,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userTypes.USER_LOGIN_REQUEST:
      return { ...state, isFetching: true, error: undefined };

    case userTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.payload,
        user: { ...jwt.decode(action.payload) },
      };

    case userTypes.USER_LOGIN_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case userTypes.USER_LOGOUT:
      return { ...state, token: undefined, user: null };

    default:
      return state;
  }
};
