import axios from 'axios';
import { returnErrors } from './errorActions';
import store from '../store';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

import { cleanUserData } from './userActions';

// Checking token & loading user

export const loadUser = () => (dispatch) => {
  // uSERm loading
  dispatch({ type: USER_LOADING });
  
  // get token from localStiorage, which is tried to taken from localstorage in reducer
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  //
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  axios.get('/user', config)
    .then(res => {
      dispatch({
      type: USER_LOADED,
      payload: res.data
      })
    })
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
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    });
};

export const logout = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  config.headers["Authorization"] = `Bearer ${token}`;
  axios.post('/users/me/logout', {}, config)
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
      dispatch(cleanUserData());

    });
 
};

export const login = ({ email, password }) => (dispatch, getState) => {
  //headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({
    email, password
  });
  axios.post('/users/login', body, config)
    .then(res => {

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    
    })
    .catch(err => {

      dispatch({
        type: LOGIN_FAIL
      });
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  return config;
};

export const getConfig = ()=> {

  const token = store.getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  config.headers["Authorization"] = `Bearer ${token}`;

  return config
}