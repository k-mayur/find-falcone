import { GET_VEHICLES, UPDATE_TIME, RESET_TIME } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  vehicles: [],
  time: 0,
  lastPlanet: "",
  lastTime: 0
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
  const chosenVehicle = prevState.vehicles.filter(
    vehicle => vehicle.name === data.vehicleName
  )[0];
  chosenVehicle.total_no--;
  const timeVehicle = data.distance / chosenVehicle.speed;
  let newTime = prevState.time;
  if (state.lastPlanet !== data.name) {
    newTime = prevState.time + timeVehicle;
  } else {
    newTime = prevState.time + timeVehicle - prevState.lastTime;
  }
  const newVehicles = prevState.vehicles
    .filter(vehicle => vehicle.name !== data.vehicleName)
    .concat(chosenVehicle);
  return {
    ...state,
    vehicles: newVehicles,
    time: newTime,
    lastPlanet: data.name,
    lastTime: timeVehicle
  };
};
