import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  user: authReducer,
  projects: projectsReducer
});

export default rootReducer;
