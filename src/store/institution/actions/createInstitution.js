import * as institutionTypes from '../types';

export const createInstitutionRequest = () => ({
  type: institutionTypes.CREATE_INSTITUTION_REQUEST,
});

export const createInstitutionSuccess = payload => ({
  type: institutionTypes.CREATE_INSTITUTION_SUCCESS,
  payload,
});

export const createInstitutionFailure = error => ({
  type: institutionTypes.CREATE_INSTITUTION_FAILURE,
  error,
});


export default institutionBody => async (dispatch, getState) => {
  dispatch(createInstitutionRequest());
  const { token } = getState().user;

  const res = await fetch('https://biofeedback-api.herokuapp.com/institution',
    {
      method: 'post',
      body: JSON.stringify(institutionBody),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });

  const ok = res.status >= 200 && res.status < 299;

  const response = await res.json();
  if (!ok) {
    dispatch(createInstitutionFailure(response.message));
    return;
  }
  dispatch(createInstitutionSuccess(response));
};
