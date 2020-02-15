export const SET_REQUEST_STATUS = 'SET_REQUEST_STATUS';

export const setRequestStatus = requestStatus => {
  return {
    type: SET_REQUEST_STATUS,
    payload: requestStatus
  };
};
