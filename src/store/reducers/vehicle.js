import {
  GET_VEHICLES,
  UPDATE_PLANETS,
  RESET_TIME,
  RESET,
  UPDATE_VEHICLES
} from "../actions/actionTypes";
import { updateState } from "../helper";

const initialState = {
  vehicles: [],
  updatedVehicles: [],
  selectedPlanets: [],
  selectedVehicles: [],
  time: 0,
  // number of planets you can send vehicles to
  numPlanetsAllowed: 4
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLES:
      return updateState(state, {
        vehicles: action.payload,
        updatedVehicles: action.payload
      });
    case UPDATE_PLANETS:
      return updateSelectedPlanets(state, action.payload);
    case UPDATE_VEHICLES:
      return updateSelectedVehicles(state, action.payload);
    case RESET_TIME:
      return { ...state, time: 0 };
    case RESET:
      return {
        ...state,
        updatedVehicles: state.vehicles,
        time: 0,
        selectedPlanets: [],
        selectedVehicles: []
      };
    default:
      return state;
  }
}

const updateSelectedPlanets = (state, planetObj) => {
  console.log(state, planetObj);
  let selectedVehicles = state.selectedVehicles;
  const { planetName, planetNumber, planets } = planetObj;
  let selectedPlanets = Object.assign({}, state.selectedPlanets);
  if (planetName === "") {
    selectedVehicles[planetNumber - 1] = undefined;
  }
  selectedPlanets[planetNumber - 1] = planetName;
  const timeAndCount = updateTimeAndCount(
    state,
    selectedPlanets,
    selectedVehicles,
    planets
  );
  return {
    ...state,
    selectedPlanets: selectedPlanets,
    time: timeAndCount.timeTaken,
    updatedVehicles: timeAndCount.updatedVehicles,
    selectedVehicles: selectedVehicles
  };
};

const updateSelectedVehicles = (state, vehicleObj) => {
  let selectedPlanets = state.selectedPlanets;
  console.log(state, vehicleObj);
  const { vehicleName, planetNumber, planets } = vehicleObj;
  let selectedVehicles = Object.assign({}, state.selectedVehicles);
  selectedVehicles[planetNumber - 1] = vehicleName;
  const timeAndCount = updateTimeAndCount(
    state,
    selectedPlanets,
    selectedVehicles,
    planets
  );
  return {
    ...state,
    selectedVehicles: selectedVehicles,
    time: timeAndCount.timeTaken,
    updatedVehicles: timeAndCount.updatedVehicles
  };
};

const updateTimeAndCount = (
  state,
  selectedPlanets,
  selectedVehicles,
  planets
) => {
  console.log(planets);
  const prevState = Object.assign({}, state);
  let timeTaken = 0;
  for (
    let planetNumber = 1;
    planetNumber <= prevState.numPlanetsAllowed;
    planetNumber++
  ) {
    if (
      selectedPlanets[planetNumber - 1] !== "" &&
      selectedPlanets[planetNumber - 1]
    ) {
      if (
        selectedVehicles[planetNumber - 1] &&
        selectedVehicles[planetNumber - 1] !== undefined
      ) {
        const distance = planets.filter(
          planet => planet.name === selectedPlanets[planetNumber - 1]
        )[0].distance;
        const speed = prevState.vehicles.filter(
          vehicle => vehicle.name === selectedVehicles[planetNumber - 1]
        )[0].speed;
        timeTaken += distance / speed;
      }
    }
  }
  const copy = prevState.vehicles.map(e => Object.assign({}, e));
  const updatedVehicles = copy.map((vehicle, i) => {
    if (Object.values(selectedVehicles).includes(vehicle.name)) {
      let count = Object.values(selectedVehicles).filter(
        veh => veh === vehicle.name
      ).length;
      console.log(count);
      vehicle.total_no -= count;
    }
    return vehicle;
  });
  return { timeTaken, updatedVehicles };
};
