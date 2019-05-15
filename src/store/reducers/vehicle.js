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
  let objV = {};
  data.selectedV.forEach(el => {
    if (el !== undefined) {
      if (objV[el]) {
        objV[el]++;
      } else {
        objV[el] = 1;
      }
    }
  });

  const updatedVeh = data.veh.map(veh => {
    if (objV[veh.name]) {
      veh.total_no -= objV[veh.name];
    }
    return veh;
  });

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

  return {
    ...state,
    vehicles: updatedVeh,
    time: newTime
  };
};
