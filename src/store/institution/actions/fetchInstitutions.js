import * as institutionTypes from '../types';
import fetchInstitutions from '../../../api/institution/fetchInstitutions';

export const fetchInstitutionsRequest = () => ({
  type: institutionTypes.FETCH_INSTITUTIONS_REQUEST,
});

export const fetchInstitutionsSuccess = payload => ({
  type: institutionTypes.FETCH_INSTITUTIONS_SUCCESS,
  payload,
});

export const fetchInstitutionFailure = error => ({
  type: institutionTypes.FETCH_INSTITUTIONS_FAILURE,
  error,
});


export default () => async (dispatch) => {
  dispatch(fetchInstitutionsRequest());

  const institutionsResponse = await fetchInstitutions();

  if (institutionsResponse instanceof Error) {
    dispatch(fetchInstitutionFailure(institutionsResponse.message));
    return;
  }

  dispatch(fetchInstitutionsSuccess(institutionsResponse));
};
