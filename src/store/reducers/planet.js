import {
  GET_PLANETS,
  FIND_RESULT,
  RESET_REDIRECT,
  RESET,
  LOADING
} from "../actions/actionTypes";
import { updateState } from "../helper";

const initialState = {
  planets: [],
  result: {},
  redirect: false,
  loding: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANETS:
      return updateState(state, { planets: action.payload });
    case FIND_RESULT:
      return updateResult(state, action.payload);
    case RESET_REDIRECT:
      return { ...state, redirect: false };
    case RESET:
      return { ...state, result: {}, redirect: false };
    case LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}

const updateResult = (state, data) => {
  return {
    ...state,
    result: data,
    redirect: true,
    loading: false
  };
};
