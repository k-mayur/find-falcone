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
  httpService.post("/token", null).then(response => {
    console.log(response.data.token);
    const data = {
      token: response.data.token,
      planet_names: planetNames,
      vehicle_names: vehicleNames
    };
    httpService.post("/find", data).then(response => {
      console.log(response);
      dispatch({
        type: FIND_RESULT,
        payload: response.data
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
