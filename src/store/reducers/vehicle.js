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
  const { planetName, planetNumber } = planetObj;
  let selectedPlanets = Object.assign({}, state.selectedPlanets);
  // if (state.selectedPlanets[planetNumber -1]) {

  // }
  selectedPlanets[planetNumber - 1] = planetName;
  return {
    ...state,
    selectedPlanets: selectedPlanets
  };
};

const updateSelectedVehicles = (state, vehicleObj) => {
  console.log(state, vehicleObj);
  const { vehicleName, planetNumber } = vehicleObj;
  let selectedVehicles = Object.assign({}, state.selectedVehicles);
  // if (state.selectedPlanets[planetNumber -1]) {

  // }
  selectedVehicles[planetNumber - 1] = vehicleName;
  return {
    ...state,
    selectedVehicles: selectedVehicles
  };
};

// const updateTimeAndCount = (state, data) => {
//   const prevState = Object.assign({}, state);
//   let objV = {};
//   data.selectedV.forEach(el => {
//     if (el !== undefined) {
//       if (objV[el]) {
//         objV[el]++;
//       } else {
//         objV[el] = 1;
//       }
//     }
//   });
//   console.log(objV, prevState.vehicles);

//   const copy = prevState.vehicles.map(e => Object.assign({}, e));

//   console.log(copy);
//   const updatedVeh = copy.map(veh => {
//     if (objV[veh.name]) {
//       veh.total_no = veh.total_no - objV[veh.name];
//     }
//     return veh;
//   });
//   console.log(updatedVeh);
//   const newTime = data.selectedV
//     .map((v, i) => {
//       if (v !== undefined) {
//         const dis = data.planets.filter(
//           planet => planet.name === data.selectedP[i]
//         )[0].distance;
//         const speed = prevState.vehicles.filter(veh => veh.name === v)[0].speed;
//         return dis / speed;
//       } else {
//         return null;
//       }
//     })
//     .reduce((a, b) => a + b);

//   return {
//     ...state,
//     updatedVehicles: updatedVeh,
//     time: newTime
//   };
// };
