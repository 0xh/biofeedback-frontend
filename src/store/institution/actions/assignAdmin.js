import * as institutionTypes from '../types';

export const institutionAssignAdminRequest = () => ({
  type: institutionTypes.INSTITUTION_ASSIGN_ADMIN_REQUEST,
});

export const institutionAssignAdminSuccess = payload => ({
  type: institutionTypes.INSTITUTION_ASSIGN_ADMIN_SUCCESS,
  payload,
});

export const institutionAssignAdminFailure = error => ({
  type: institutionTypes.INSTITUTION_ASSIGN_ADMIN_FAILURE,
  error,
});


export default (id, adminId) => async (dispatch, getState) => {
  dispatch(institutionAssignAdminRequest());
  const { token } = getState().user;
  const res = await fetch(`http://biofeedback-api.herokuapp.com/institution/${id}/user/${adminId}`,
    {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


  const ok = res.status >= 200 && res.status < 299;

  const response = await res.json();
  if (!ok) {
    dispatch(institutionAssignAdminFailure(response.message));
    return;
  }

  dispatch(institutionAssignAdminSuccess(response));
};
