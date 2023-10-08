import React from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import axios from "axios"

const HOST = 'http://localhost:4000/api'
const userData = {
  loginOrEmail: "customer@gmail.com",
  password: "1111111"
}

let token



async function refreshAccessToken() {
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

const axiosApiInstance = axios.create();
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
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    await refreshAccessToken()
    axios.defaults.headers.common.Authorization = token;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});



function App() {

  const newProduct = {
    name: "ХХХХХХХХХХХХХХХХХХ",
    currentPrice: 199.99,
    previousPrice: 250,
    categories: "men",
    imageUrls: [
      "img/products/men/001.png",
      "img/products/men/002.png",
      "img/products/men/003.png",
      "img/products/men/004.png"
    ],
    quantity: 100,
    color: "red",
    productUrl: "/men",
    brand: "braaaand",
    myCustomParam: "some string or json for custom param"
  };

  axiosApiInstance
        .post(HOST + "/products", newProduct)
        .then(_newProduct => {
            console.log('New product added', _newProduct)          
        })
        .catch(err => {
            console.error('Error on add product', err)
        });
  
  // axios
  //   .post(HOST + "/products", newProduct)
  //   .then(newProduct => {
  //     console.log(newProduct);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  
  // Child category
  
  

  axios 
  .get( HOST + "/products") 
  .then( products => {
    console.log(products); 
  }) 
  .catch( err => {
    console.log("err" + err);
  });
  
  return  <Router></Router>

}

export default App
