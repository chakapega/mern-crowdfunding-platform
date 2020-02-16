import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import loaderReducer from './loader/reducer';
import languageSwitchReducer from './languageSwitch/reducer';

const rootReducer = combineReducers({
  user: authReducer,
  loader: loaderReducer,
  language: languageSwitchReducer
});

export default rootReducer;
