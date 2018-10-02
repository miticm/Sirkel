import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Add auth token in header to following requests
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
