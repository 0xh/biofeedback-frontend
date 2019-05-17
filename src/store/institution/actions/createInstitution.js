import * as institutionTypes from '../types';
import createInstitution from '../../../api/institution/createInstitution';

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


export default institutionBody => async (dispatch) => {
  dispatch(createInstitutionRequest());

  const institutionResponse = await createInstitution(institutionBody);

  if (institutionResponse instanceof Error) {
    dispatch(createInstitutionFailure(institutionResponse.message));
    return;
  }
  dispatch(createInstitutionSuccess(institutionResponse));
};
