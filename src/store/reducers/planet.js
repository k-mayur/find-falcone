import { GET_PLANETS } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  planets: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANETS:
      return updateObject(state, { planets: action.payload });
    default:
      return state;
  }
}
