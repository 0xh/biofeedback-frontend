import * as institutionTypes from '../types';

const initialState = {
  isFetching: false,
  data: [],
  error: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case institutionTypes.DELETE_INSTITUTION_REQUEST:
    case institutionTypes.FETCH_INSTITUTIONS_REQUEST:
      return { ...state, isFetching: true, error: undefined };

    case institutionTypes.FETCH_INSTITUTIONS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload };

    case institutionTypes.DELETE_INSTITUTION_FAILURE:
    case institutionTypes.FETCH_INSTITUTIONS_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case institutionTypes.DELETE_INSTITUTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: state.data.filter(({ _id }) => _id !== action.id),
      };
    default:
      return state;
  }
};
