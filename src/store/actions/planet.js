import axios from "axios";
import { GET_PLANETS } from "./actionTypes";

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

export const findHandler = () => dispatch => {
  console.log("hi");
};
