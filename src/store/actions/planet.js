import axios from "axios";
import {
  GET_PLANETS,
  FIND_RESULT,
  RESET_REDIRECT,
  RESET_TIME,
  RESET,
  LOADING
} from "./actionTypes";
import httpService from "../../services/httpService";

export const getPlanets = () => dispatch => {
  httpService.get("/planets").then(planets => {
    dispatch({
      type: GET_PLANETS,
      payload: planets.data
    });
  });
};

export const findHandler = (planetNames, vehicleNames) => dispatch => {
  httpService.get("/token").then(res => {
    const data = {
      token: res.data.token,
      planet_names: planetNames,
      vehicle_names: vehicleNames
    };
    httpService.post("/find", data).then(res => {
      dispatch({
        type: FIND_RESULT,
        payload: res.data
      });
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
