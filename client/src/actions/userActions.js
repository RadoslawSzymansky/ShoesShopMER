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
  REMOVE_FROM_BASKET,
  REMOVE_FROM_FAVORITES,
  BUY_PRODUCT_FAILED,
  BUY_PRODUCT_SUCCESS
} from './types';
import { getConfig } from './authActions';

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
  const config = getConfig();

  dispatch({
    type: FETCH_BASKET_LOADING
  });
 
  axios.get(`/users/basket`, {}, config)
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
      })
    });
};

export const fetchFavorites = () => (dispatch, getState) => {
  const config = getConfig();

  dispatch({
    type: FETCH_FAVORITES_LOADING
  });

  axios.get(`/users/favorites`, {}, config)
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
  const config = getConfig();
  const body = {
    productToBuscet
  };

  axios.patch(`/users`, body, config)
    .then(res => {
      dispatch({
        type: ADD_TO_BASKET,
        payload: res.data
      });
    });
};

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
  
  axios.patch(`/users/basket/${productId}`, {}, config)
    .then(res => {
      dispatch({
        type: REMOVE_FROM_BASKET,
        payload: productId
      });
    });
};

/// usuwanie z ulubionych. sprawdzam czy mam taki endpoint na serwerze
export const removeFromFavorite = productId => dispatch => {
  const config = getConfig();

  axios.patch(`/users/favorites/${productId}`, {}, config)
    .then(res => {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: productId
      });
    });
};