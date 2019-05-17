import * as institutionTypes from '../types';
import deleteInstitution from '../../../api/institution/deleteInstitution';

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


export default id => async (dispatch) => {
  dispatch(deleteInstitutionRequest());

  const response = await deleteInstitution(id);

  if (response instanceof Error) {
    dispatch(deleteInstitutionFailure(response.message));
    return;
  }
  dispatch(deleteInstitutionSuccess(id));
};
