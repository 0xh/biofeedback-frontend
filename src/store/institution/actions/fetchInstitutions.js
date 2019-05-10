import * as institutionTypes from '../types';

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


export default () => async (dispatch, getState) => {
  const { token } = getState().user;
  dispatch(fetchInstitutionsRequest());

  const res = await fetch('https://biofeedback-api.herokuapp.com/institution',
    { headers: { Authorization: `Bearer ${token}` } });
  const response = await res.json();
  const ok = res.status >= 200 && res.status < 299;

  if (!ok) {
    dispatch(fetchInstitutionFailure(response.message));
    return;
  }

  dispatch(fetchInstitutionsSuccess(response));
};
