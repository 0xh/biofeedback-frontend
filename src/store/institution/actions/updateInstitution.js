import * as institutionTypes from '../types';

export const updateInistitutionRequest = () => ({
  type: institutionTypes.UPDATE_INSTITUTION_REQUEST,
});

export const updateInstitutionSuccess = payload => ({
  type: institutionTypes.UPDATE_INSTITUTION_SUCCESS,
  payload,
});

export const updateInstitutionFailure = error => ({
  type: institutionTypes.UPDATE_INSTITUTION_FAILURE,
  error,
});


export default ({ id, ...body }) => async (dispatch, getState) => {
  dispatch(updateInistitutionRequest());
  const { token } = getState().user;
  const res = await fetch(`https://biofeedback-api.herokuapp.com/institution/${id}`,
    {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });


  const ok = res.status >= 200 && res.status < 299;

  if (!ok) {
    const response = await res.json();
    dispatch(updateInstitutionFailure(response.message));
    return;
  }

  dispatch(updateInstitutionSuccess({ id, ...body }));
};
