import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import loaderReducer from './loader/reducer';
import languageSwitchReducer from './languageSwitch/reducer';
import searchReducer from './search/reducer';

const rootReducer = combineReducers({
  user: authReducer,
  loader: loaderReducer,
  language: languageSwitchReducer,
  search: searchReducer
});

export default rootReducer;
