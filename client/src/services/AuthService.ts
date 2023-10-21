import $api from "../http";
// import axios from "axios";
// import { AxiosResponse } from "axios";


export async function login({loginOrEmail, password}) {
return $api.post('/customers/login', {loginOrEmail, password})
}

export async function registration({firstName, lastName, login, email, password, telephone, isAdmin}) {
    return $api.post('/customers', {firstName, lastName, login, email, password, telephone, isAdmin})
    }
export async function logout() {
        return $api.post('/logout')
        }

export async function checkAuth() {
        return $api('/customers/customer')
        
        }


    
// export const setAuthToken = token => {
//   if (token) {
//     // Apply to every request
//     axios.defaults.headers.common.Authorization = token;
//   } else {
//     // Delete auth header
//     delete axios.defaults.headers.common.Authorization;
//   }
// };


// import jwt_decode from "jwt-decode";
 
// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzJjYjRlNzBkOGUwMmNjY2ZjZWYzNiIsImZpcnN0TmFtZSI6ItCS0LvQsNC00LjQvNC40YAiLCJsYXN0TmFtZSI6ItCc0LXQtNCy0LXQtNGH0YPQuiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTc5MDUxMDQsImV4cCI6MTY5Nzk0MTEwNH0.T4DPFHhYFi3RqBLoKz9haU8RWcBc6GG51g54-BNZZCc";
// var decoded = jwt_decode(token);
 
// console.log("ogooo" + decoded);

