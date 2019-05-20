export const updateState = (oldState, updatedValues) => {
  return {
    ...oldState,
    ...updatedValues,
    loading: false
  };
};

// export const dispatchAction = (type, payload) => dispatch => {
//   dispatch({
//     type: type,
//     payload: payload
//   });
// };
