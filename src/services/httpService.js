import axios from "axios";

const globalUrl = "https://findfalcone.herokuapp.com";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const httpService = {
  get: api => {
    return axios
      .get(globalUrl + api, null, { headers })
      .catch(err => console.log(err));
  },
  post: (api, data) => {
    return axios
      .post(globalUrl + api, data, { headers })
      .catch(err => console.log(err));
  }
};

export default httpService;
