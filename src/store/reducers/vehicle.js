import { GET_VEHICLES, UPDATE_TIME, RESET_TIME } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  vehicles: [],
  time: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLES:
      return updateObject(state, { vehicles: action.payload });
    case UPDATE_TIME:
      return updateTimeAndCount(state, action.payload);
    case RESET_TIME:
      return { ...state, time: 0, lastTime: 0, lastPlanet: "" };
    default:
      return state;
  }
}

const updateTimeAndCount = (state, data) => {
  const prevState = Object.assign({}, state);
  console.log(data);
  const newTime = data.selectedV
    .map((v, i) => {
      if (v !== undefined) {
        const dis = data.planets.filter(
          planet => planet.name === data.selectedP[i]
        )[0].distance;
        const speed = prevState.vehicles.filter(veh => veh.name === v)[0].speed;
        return dis / speed;
      } else {
        return null;
      }
    })
    .reduce((a, b) => a + b);

  console.log(newTime);

  return {
    ...state,
    time: newTime
  };
};
