export const SET_SEARCHING_RESULTS = 'SET_SEARCHING_RESULTS';

export const setSearchingResults = searchingResults => {
  return {
    type: SET_SEARCHING_RESULTS,
    payload: searchingResults
  };
};
