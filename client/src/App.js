import React from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import axios from "axios"



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
  
  axios
    .post("http://localhost:4000/api/products", newProduct)
    .then(newProduct => {
      console.log(newProduct);
    })
    .catch(err => {
      console.log(err);
    });
  
  // Child category
  
  

  // axios 
  // .get( "http://localhost:4000/api/products") 
  // .then( catalog => {
  //   console.log(catalog); 
  // }) 
  // .catch( err => {
  //   console.log("err" + err);
  // });
  
  return  <Router></Router>

}

export default App
