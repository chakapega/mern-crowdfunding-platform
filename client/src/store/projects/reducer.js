import { SET_SELECTED_PROJECT } from './actions';

const initialState = {
  selectedProject: JSON.parse(sessionStorage.getItem('selectedProject')) || {}
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PROJECT:
      sessionStorage.setItem('selectedProject', JSON.stringify(action.payload));

      return { ...state, selectedProject: action.payload };
    default:
      return state;
  }
};

export default projectsReducer;
