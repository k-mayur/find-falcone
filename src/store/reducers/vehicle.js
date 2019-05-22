import {
  GET_VEHICLES,
  UPDATE_PLANETS,
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
  let selectedVehicles = state.selectedVehicles;

  const { planetName, planetNumber, planets } = planetObj;

  let selectedPlanets = Object.assign({}, state.selectedPlanets);

  if (planetName === "") {
    delete selectedVehicles[planetNumber - 1];
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
  const prevState = Object.assign({}, state);
  let timeTaken = 0;
  for (let i = 0; i < prevState.numPlanetsAllowed; i++) {
    if (
      selectedPlanets[i] !== "" &&
      selectedPlanets[i] &&
      selectedVehicles[i]
    ) {
      const distance = planets.find(
        planet => planet.name === selectedPlanets[i]
      ).distance;
      const speed = prevState.vehicles.find(
        vehicle => vehicle.name === selectedVehicles[i]
      ).speed;
      timeTaken += distance / speed;
    }
  }
  const vehiclesArray = prevState.vehicles.map(vehicle =>
    Object.assign({}, vehicle)
  );

  const updatedVehicles = vehiclesArray.map(vehicle => {
    if (Object.values(selectedVehicles).includes(vehicle.name)) {
      let count = Object.values(selectedVehicles).filter(
        veh => veh === vehicle.name
      ).length;
      vehicle.total_no -= count;
    }
    return vehicle;
  });
  return { timeTaken, updatedVehicles };
};
