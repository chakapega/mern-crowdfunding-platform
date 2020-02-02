import { SET_USER_DATA } from './actions';

const initialState = {
  userData: {
    uid: '',
    email: '',
    displayName: '',
    photoURL: ''
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default authReducer;
