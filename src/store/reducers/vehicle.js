import { GET_VEHICLES } from "../actions/actionTypes";

const initialState = {
  vehicles: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLES:
      let vehicles = Object.assign([], action.payload);
      return {
        ...state,
        vehicles: vehicles
      };
    default:
      return state;
  }
}
