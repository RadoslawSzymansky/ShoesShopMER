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
  ADD_TO_BASKET_REQUEST,
  CLEAN_USER_DATA
} from '../actions/types';

const initialState = { 
  basket: [],
  favorites: [],
  basketIsFailed: false,
  basketIsLoading: false
};



export default function (state = initialState, action) {
  switch (action.type) {
    // basket
    case FETCH_BASKET_LOADING:

      return {
        ...state,
        basketIsLoading: true
      };

    case FETCH_BASKET_SUCCESS:
      return {
        ...state, 
        basket: action.payload,
        basketIsLoading: false

      };

    case FETCH_BASKET_FAILED:

      return {
        ...state,
        basket: [],
        basketIsLoading: false,
        basketIsFailed: true
      };

    // favorites
    case FETCH_FAVORITES_LOADING:
      return {
        ...state,
        favorites: {
          areLoading: true
        }
      };
    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.payload
      };
     
    case FETCH_FAVORITES_FAILED:
      return {
        ...state,
        favorites: {
          isLoading: false,
          isFailed: true
        }
      };

    // working on basket  
    case ADD_TO_BASKET_REQUEST: 
      return {
        ...state,
        basketIsLoading: true
      };
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload],
        basketIsLoading: false
      };

    case REMOVE_FROM_BASKET:
      const updatedBasket = state.basket.filter(e => e.id !== action.payload);
      return {
        ...state,
        basket: updatedBasket
      };
    
    //working on favorites
    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    
    case REMOVE_FROM_FAVORITES:
      const updatedFavorites = state.favorites.filter(e => e !== action.payload);
      return {
        ...state,
        favorites: updatedFavorites
      };
    
    case CLEAN_USER_DATA:
      console.log('reducer czyszczenia')
      return {
        ...state,
        basket: [],
        favorites: []
      };

    default:
      return state;
  };
};