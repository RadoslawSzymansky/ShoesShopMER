import {
  FETCH_SHOE_LOADING,
  FETCH_SHOE_FAILED,
  FETCH_SHOE_SUCCESS,
  FETCH_SHOES_LOADING,
  FETCH_SHOES_FAILED,
  FETCH_SHOES_SUCCESS
 } from './types';

import axios from 'axios';
// tu reducery do zmiany stanu produktow
// do kotrych potrzebujemy autoryzacji :

// na wszystkich na catch(err => dispatchEvent(err.resposne.data, err.response.status))

export const fetchProduct = id => dispatch => {
  dispatch({
    type: FETCH_SHOE_LOADING,
    payload: id
  }); 
  console.log('pobieranie', id)
  axios.get(`/api/shoes/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_SHOE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_SHOE_FAILED,
        payload: {
          id,
          msg: err
        }
      });
    });
};

// getting alll products 
export const fetchProducts = () => (dispatch) => {
  dispatch({
    type: FETCH_SHOES_LOADING
  });

  axios.get(`/api/shoes`)
    .then(res => {
      dispatch({
        type: FETCH_SHOES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_SHOES_FAILED,
        payload: {
          msg: err
        }
      });
    });
};
