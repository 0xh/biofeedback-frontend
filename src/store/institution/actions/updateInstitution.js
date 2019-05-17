import * as institutionTypes from '../types';
import updateInstitution from '../../../api/institution/updateInstitution';

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


export default ({ id, ...body }) => async (dispatch) => {
  dispatch(updateInistitutionRequest());

  const updatedInstitutionResponse = await updateInstitution(id, body);


  if (updatedInstitutionResponse instanceof Error) {
    dispatch(updateInstitutionFailure(updatedInstitutionResponse.message));
    return;
  }

  dispatch(updateInstitutionSuccess({ id, ...body }));
};
