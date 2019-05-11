import * as institutionTypes from '../types';

export const deleteInstitutionRequest = () => ({
  type: institutionTypes.DELETE_INSTITUTION_REQUEST,
});

export const deleteInstitutionSuccess = id => ({
  type: institutionTypes.DELETE_INSTITUTION_SUCCESS,
  id,
});

export const deleteInstitutionFailure = error => ({
  type: institutionTypes.DELETE_INSTITUTION_FAILURE,
  error,
});


export default id => async (dispatch, getState) => {
  dispatch(deleteInstitutionRequest());
  const { token } = getState().user;

  const res = await fetch(`https://biofeedback-api.herokuapp.com/institution/${id}`,
    {
      method: 'delete',
      headers: { Authorization: `Bearer ${token}` },
    });

  const ok = res.status >= 200 && res.status < 299;


  if (!ok) {
    const response = await res.json();
    dispatch(deleteInstitutionFailure(response.message));
    return;
  }
  dispatch(deleteInstitutionSuccess(id));
};
