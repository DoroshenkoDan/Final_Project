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

// const $api = axios.create({
//     withCredentials: true,
//     baseURL: API_URL
// })

// $api.interceptors.request.use((config) => {
//     config.headers.Autorization = `${localStorage.getItem('token')}`
//     return config;
// })
// export default $api

