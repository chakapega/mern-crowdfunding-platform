import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import loaderReducer from './loader/reducer';

const rootReducer = combineReducers({
  user: authReducer,
  loader: loaderReducer
});

export default rootReducer;
