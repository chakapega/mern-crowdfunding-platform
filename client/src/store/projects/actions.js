export const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECT';

export const setSelectedProject = selectedProject => {
  return {
    type: SET_SELECTED_PROJECT,
    payload: selectedProject
  };
};
