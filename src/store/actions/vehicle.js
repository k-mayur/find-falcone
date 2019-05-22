import { GET_VEHICLES, UPDATE_PLANETS, UPDATE_VEHICLES } from "./actionTypes";
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

export const updateSelectedPlanets = (planetName, planetNumber) => dispatch => {
  const planets = store.getState().planet.planets;
  dispatch({
    type: UPDATE_PLANETS,
    payload: { planetName, planetNumber, planets }
  });
};

export const updateSelectedVehicles = (
  vehicleName,
  planetNumber
) => dispatch => {
  const planets = store.getState().planet.planets;
  dispatch({
    type: UPDATE_VEHICLES,
    payload: { vehicleName, planetNumber, planets }
  });
};
