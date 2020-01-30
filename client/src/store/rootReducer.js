import { combineReducers } from 'redux';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  user: authReducer
});

export default rootReducer;
