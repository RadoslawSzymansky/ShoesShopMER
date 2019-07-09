import { tokenConfig } from './authActions.js';
import { returnErrors } from './errorActions';
import axios from 'axios';
// tu reducery do zmiany stanu produktow
// do kotrych potrzebujemy autoryzacji :

// na wszystkich na catch(err => dispatchEvent(err.resposne.data, err.response.status))

export const addProduct = item => (dispatch, getState)  => {
  // jako headers w axios musimy dolaczyc token  
  axios.post('/adres', item, tokenConfig(getState))
    .then(res=> {
      dispatch({
        type: 'JAKIS',
        payload: res.data
      });
    });
};