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
      console.log('zaczete')

      return {
        ...state,
        [action.payload]: {
          isLoading: true
        }
      };
    
    case FETCH_SHOE_SUCCESS:
      console.log('sukces pobieranie')

      return {
        ...state,
        [action.payload._id]: action.payload
      }
    
    case FETCH_SHOE_FAILED:
      console.log('sukces pobieranie')

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