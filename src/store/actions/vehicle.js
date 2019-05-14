import axios from "axios";
import { GET_VEHICLES } from "./actionTypes";

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
