import * as institutionTypes from '../types';

const initialState = {
  isFetching: false,
  data: [],
  error: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case institutionTypes.CREATE_INSTITUTION_REQUEST:
    case institutionTypes.INSTITUTION_ASSIGN_ADMIN_REQUEST:
    case institutionTypes.UPDATE_INSTITUTION_REQUEST:
    case institutionTypes.DELETE_INSTITUTION_REQUEST:
    case institutionTypes.FETCH_INSTITUTIONS_REQUEST:
      return { ...state, isFetching: true, error: undefined };

    case institutionTypes.FETCH_INSTITUTIONS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload };

    case institutionTypes.CREATE_INSTITUTION_FAILURE:
    case institutionTypes.INSTITUTION_ASSIGN_ADMIN_FAILURE:
    case institutionTypes.UPDATE_INSTITUTION_FAILURE:
    case institutionTypes.DELETE_INSTITUTION_FAILURE:
    case institutionTypes.FETCH_INSTITUTIONS_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case institutionTypes.DELETE_INSTITUTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: state.data.filter(({ _id }) => _id !== action.id),
      };

    case institutionTypes.UPDATE_INSTITUTION_SUCCESS: {
      const { id, ...body } = action.payload;
      return {
        ...state,
        isFetching: false,
        data: state.data.map(institution => ({
          ...institution,
          ...(institution._id === id && body),
        })),
      };
    }
    case institutionTypes.INSTITUTION_ASSIGN_ADMIN_SUCCESS: {
      const { _id } = action.payload;
      return {
        ...state,
        isFetching: false,
        data: state.data.map(institution => ({
          ...institution,
          ...(institution._id === _id && action.payload),
        })),
      };
    }

    case institutionTypes.CREATE_INSTITUTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: state.data.concat(action.payload),
      };
    default:
      return state;
  }
};
