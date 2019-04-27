import * as usersTypes from '../types';

const initialState = {
  isFetching: false,
  data: [],
  error: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case usersTypes.FETCH_USERS_REQUEST:
      return { ...state, isFetching: true, error: undefined };

    case usersTypes.FETCH_USERS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload };

    case usersTypes.FETCH_USERS_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
};
