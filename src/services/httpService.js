import axios from "axios";

const globalUrl = "https://findfalcone.herokuapp.com";
const header = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const httpService = {
  get: api => {
    return axios
      .get(globalUrl + api, null, header)
      .catch(err => console.log(err));
  }
};

export default httpService;
