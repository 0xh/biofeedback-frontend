import * as institutionTypes from '../types';
import assignAdmin from '../../../api/institution/assignAdmin';

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


export default (id, adminId) => async (dispatch) => {
  dispatch(institutionAssignAdminRequest());
  const adminResponse = await assignAdmin(id, adminId);


  if (adminResponse instanceof Error) {
    dispatch(institutionAssignAdminFailure(adminResponse.message));
    return;
  }

  dispatch(institutionAssignAdminSuccess(adminResponse));
};
