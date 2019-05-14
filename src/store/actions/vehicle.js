import axios from "axios";
import { GET_VEHICLES, UPDATE_TIME } from "./actionTypes";

export const getVehicles = () => dispatch => {
  axios
    .get("https://findfalcone.herokuapp.com/vehicles")
    .then(vehicles => {
      console.log(vehicles.data);
      dispatch({
        type: GET_VEHICLES,
        payload: vehicles.data
      });
    })
    .catch(err => console.log(err));
};

export const updateTimeAndCount = (vehicleName, distance, name) => dispatch => {
  dispatch({
    type: UPDATE_TIME,
    payload: { vehicleName, distance, name }
  });
};
