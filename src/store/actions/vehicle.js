import axios from "axios";
import { GET_VEHICLES, UPDATE_TIME } from "./actionTypes";

import store from "../Store";

export const getVehicles = () => dispatch => {
  axios
    .get("https://findfalcone.herokuapp.com/vehicles")
    .then(vehicles => {
      dispatch({
        type: GET_VEHICLES,
        payload: vehicles.data
      });
    })
    .catch(err => console.log(err));
};

export const updateTimeAndCount = (selectedP, selectedV) => dispatch => {
  const planets = store.getState().planet.planets;
  dispatch({
    type: UPDATE_TIME,
    payload: { selectedP, selectedV, planets }
  });
};
