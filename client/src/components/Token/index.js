import axios from "axios";

export const HOST = 'http://localhost:4000/api'
const userData = {
    loginOrEmail: "customer@gmail.com",
    password: "1111111"
  }
  
  export let token
  
  
  
  export async function refreshAccessToken() {
    await axios
        .post(HOST + "/customers/login", userData)
        .then(loginResult => {
          token = loginResult.data.token
          // console.log(`==== Login Result`, loginResult )
          // console.log(`==== TOKEN`, token)
        })
        .catch(err => {
          console.error(err)
        });
  }
  
  export const axiosApiInstance = axios.create();
  // Request interceptor for API calls
  axiosApiInstance.interceptors.request.use(
      async config => {
        await refreshAccessToken()
        config.headers = {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
      },
      error => {
        Promise.reject(error)
      });
      
  // axiosApiInstance.interceptors.response.use((response) => {
        //     return response
        //   }, async function (error) {
        //     const originalRequest = error.config;
        //     if (error.response.status === 403 && !originalRequest._retry) {
        //       originalRequest._retry = true;
        //       await refreshAccessToken()
        //       axios.defaults.headers.common.Authorization = token;
        //       return axiosApiInstance(originalRequest);
        //     }
        //     return Promise.reject(error);
        //   });
