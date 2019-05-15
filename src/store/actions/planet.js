import axios from "axios";
import { GET_PLANETS, FIND_RESULT, RESET_REDIRECT } from "./actionTypes";

export const getPlanets = () => dispatch => {
  axios
    .get("https://findfalcone.herokuapp.com/planets")
    .then(planets => {
      console.log(planets.data);
      dispatch({
        type: GET_PLANETS,
        payload: planets.data
      });
    })
    .catch(err => console.log(err));
};

export const findHandler = (planetNames, vehicleNames) => dispatch => {
  axios
    .post("https://findfalcone.herokuapp.com/token", null, {
      headers: {
        Accept: "application/json"
      }
    })
    .then(res => {
      console.log(res.data.token);
      const data = {
        token: res.data.token,
        planet_names: planetNames,
        vehicle_names: vehicleNames
      };
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      axios
        .post("https://findfalcone.herokuapp.com/find", data, config)
        .then(res => {
          console.log(res);
          dispatch({
            type: FIND_RESULT,
            payload: res.data
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

export const resetRedirect = () => dispatch => {
  dispatch({
    type: RESET_REDIRECT
  });
};
