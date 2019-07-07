import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
USER_LOADING,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS,
REGISTER_SUCCESS,
REGISTER_FAIL,
GET_ERRORS,
CLEAR_ERRORS
} from '../actions/types';

// Checking token & loading user

export const loadUser = () => (dispatch, getState) => {
  // uSERm loading
  dispatch({ type: USER_LOADING });
  
  // get token from localStiorage, which is tried to taken from localstorage in reducer
  const token = getState().auth.token;
 
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) config.headers["Authorization"] = `"Bearer ${token}"`;

  axios.get('/user', config)
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// REGISTER USER
export const register = ({ name, email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({
    name, email, password
  });
  console.log(body)
  axios.post('/users', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};