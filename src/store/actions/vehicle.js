import axios from "axios";
import { GET_VEHICLES, UPDATE_TIME } from "./actionTypes";
import httpService from "../../services/httpService";

import store from "../Store";

export const getVehicles = () => dispatch => {
  httpService.get("/vehicles").then(vehicles => {
    dispatch({
      type: GET_VEHICLES,
      payload: vehicles.data
    });
  });
};

export const updateTimeAndCount = (selectedP, selectedV) => dispatch => {
  const planets = store.getState().planet.planets;
  dispatch({
    type: UPDATE_TIME,
    payload: { selectedP, selectedV, planets }
  });
};
