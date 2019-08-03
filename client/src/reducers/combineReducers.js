import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import shoesReducer from  './shoesReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  products: shoesReducer,
  user: userReducer
});