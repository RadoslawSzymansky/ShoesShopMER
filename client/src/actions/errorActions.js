import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// return errors 
export const returnErrors = (msg, status, id = "REGISTER_FAIL") => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};