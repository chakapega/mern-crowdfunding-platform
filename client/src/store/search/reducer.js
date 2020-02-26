import { SET_SEARCHING_RESULTS } from './actions';

const initialState = {
  foundProjects: []
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHING_RESULTS:
      return { ...state, foundProjects: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
