import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common.Authorization = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common.Authorization;
  }
};

export const API_URL = `http://localhost:4000/api` 



