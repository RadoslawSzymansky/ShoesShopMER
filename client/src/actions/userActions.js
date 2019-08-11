import axios from 'axios';
import {
  FETCH_BASKET_LOADING,
  FETCH_BASKET_FAILED,
  FETCH_BASKET_SUCCESS,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_LOADING,
  FETCH_FAVORITES_FAILED,
  ADD_TO_FAVORITE,
  ADD_TO_BASKET,
  ADD_TO_BASKET_REQUEST,
  REMOVE_FROM_BASKET,
  REMOVE_FROM_FAVORITES,
  BUY_PRODUCT_FAILED,
  BUY_PRODUCT_SUCCESS,
  CLEAN_USER_DATA
} from './types'; 
import history from '../history';

import { getConfig, tokenConfig } from './authActions';

export const buyProduct = ({ id, size, count }) => dispatch => {
  
  axios.put(`/api/shoes/${id}?size=${size}&count=${count}`)
    .then(res => {
      // zwaraca produkt który mozna dorzucic do historii
      dispatch({
        type: BUY_PRODUCT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: BUY_PRODUCT_FAILED,
        payload: {
          msg: err
        }
      });
    });
};

export const fetchBasket = () => (dispatch, getState) => {

  const config = getConfig(getState);

  dispatch({
    type: FETCH_BASKET_LOADING
  });
  axios.get(`/users/basket`, config)
    .then(res => {
      dispatch({
        type: FETCH_BASKET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BASKET_FAILED,
        payload: {
          msg: err
        }
      });
    });
};

export const fetchFavorites = () => (dispatch, getState) => {
  const config = getConfig(getState);
  dispatch({
    type: FETCH_FAVORITES_LOADING
  });

  axios.get(`/users/favorites`, config)
    .then(res => {
      dispatch({
        type: FETCH_FAVORITES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_FAVORITES_FAILED,
        payload: {
          msg: err
        }
      });
    });
};

export const addProductToBuscet = productToBuscet => (dispatch, getState) => {

  const { isAuthenticated } = getState().auth;
  dispatch({type: ADD_TO_BASKET_REQUEST})
  if ( !isAuthenticated ) {
    dispatch({
      type: ADD_TO_BASKET,
      payload: productToBuscet
    });
    
    return;
  }
  
  const config = getConfig();
  const body = {
    productToBuscet
  };

  axios.patch(`/users`, body, config)
    .then(res => {

      dispatch({
        type: ADD_TO_BASKET,
        payload: productToBuscet
      });

      setTimeout(() => history.push('/'), 500);

    }).catch(err => {
    });
};

export const connectBaskets = () => (dispatch, getState) => {
  const localBasket = getState().user.basket;
// / -----------------------------------------------



  // STWORZYC REDUCER KTORY ZAKTUALIIZUJE BASKET O JUZ DZIALA?

////
  const config = tokenConfig(getState);
  const body = { localeBasket: localBasket };
  console.log('connect bakets akcja', body)
  axios.patch('/users/basket/concat', body, config)
    .then(res => {
      console.log(res);
    })
}

export const addToFavorites = favoriteProductId => (dispatch) => {
  const config = getConfig();
  const body = {
    favoriteProductId
  };

  axios.patch(`/users`, body, config)
    .then(res => {
      dispatch({
        type: ADD_TO_FAVORITE,
        payload: favoriteProductId
      });
    });
};


/// usuwanie z koszyka. sprawdzam czy mam taki endpoint na serwerze
export const removeFromBasket = productId => dispatch => {
  const config = getConfig();
  
  axios.patch(`/users/basket/${productId}`, config)
    .then(res => {
      dispatch({
        type: REMOVE_FROM_BASKET,
        payload: productId
      });
    });
};

/// usuwanie z ulubionych. sprawdzam czy mam taki endpoint na serwerze
export const removeFromFavorites = productId => dispatch => {
  const config = getConfig();

  axios.patch(`/users/favorites/${productId}`, {}, config)
    .then(res => {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: productId
      });
    });
};

export const cleanUserData = () => {
  return {
    type: CLEAN_USER_DATA
  };
};