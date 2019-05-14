import { GET_PLANETS } from "../actions/actionTypes";

const initialState = {
  planets: [],
  time: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANETS:
      let planets = Object.assign([], action.payload);
      return {
        ...state,
        planets: planets
      };
    default:
      return state;
  }
}
