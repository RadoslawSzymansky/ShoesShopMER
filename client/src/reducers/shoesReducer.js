import _ from 'lodash';
import {
  FETCH_SHOE_LOADING,
  FETCH_SHOE_FAILED,
  FETCH_SHOE_SUCCESS,
  FETCH_SHOES_LOADING,
  FETCH_SHOES_FAILED,
  FETCH_SHOES_SUCCESS
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {

    case FETCH_SHOES_LOADING:
      return {
        areLoading: true
      };

    case FETCH_SHOES_SUCCESS:
      return _.keyBy(action.payload, '_id');

    case FETCH_SHOES_FAILED:
      return { areLoading: false, isFailed: true };

    case FETCH_SHOE_LOADING:
      return {
        ...state,
        [action.payload]: {
          isLoading: true
        }
      };
    
    case FETCH_SHOE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    
    case FETCH_SHOE_FAILED:
      return {
        ...state,
        [action.payload.id]: {
          isFailed: true
        }
      };

    default:
      return state;
  };
};