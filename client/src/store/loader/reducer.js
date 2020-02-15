import { SET_REQUEST_STATUS } from './actions';

const initialState = {
  requestStatus: false
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUEST_STATUS:
      return { ...state, requestStatus: action.payload };
    default:
      return state;
  }
};

export default loaderReducer;
