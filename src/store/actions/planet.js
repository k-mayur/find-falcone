import {
  GET_PLANETS,
  FIND_RESULT,
  RESET_REDIRECT,
  RESET_TIME,
  RESET,
  LOADING,
  SET_TOKEN
} from "./actionTypes";
import httpService from "../../services/httpService";
import store from "../Store";

export const getPlanets = () => dispatch => {
  httpService.get("/planets").then(planets => {
    dispatch({
      type: GET_PLANETS,
      payload: planets.data
    });
  });
};

export const setToken = () => dispatch => {
  httpService.post("/token", null).then(response => {
    dispatch({
      type: SET_TOKEN,
      payload: response.data.token
    });
  });
};

export const findHandler = (planetNames, vehicleNames) => dispatch => {
  const data = {
    token: store.getState().planet.token,
    planet_names: planetNames,
    vehicle_names: vehicleNames
  };
  httpService.post("/find", data).then(response => {
    dispatch({
      type: FIND_RESULT,
      payload: response.data
    });
  });
};

export const resetRedirect = () => dispatch => {
  dispatch({
    type: RESET_REDIRECT
  });
  dispatch({
    type: RESET_TIME
  });
};

export const resetHandler = () => dispatch => {
  dispatch({
    type: RESET
  });
};

export const loading = () => dispatch => {
  dispatch({
    type: LOADING
  });
};
