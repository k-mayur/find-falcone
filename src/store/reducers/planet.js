import {
  GET_PLANETS,
  FIND_RESULT,
  RESET_REDIRECT
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  planets: [],
  result: {},
  redirect: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANETS:
      return updateObject(state, { planets: action.payload });
    case FIND_RESULT:
      return updateResult(state, action.payload);
    case RESET_REDIRECT:
      return { ...state, redirect: false };
    default:
      return state;
  }
}

const updateResult = (state, data) => {
  return {
    ...state,
    result: data,
    redirect: true
  };
};
