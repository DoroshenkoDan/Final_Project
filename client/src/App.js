import React from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import axios from "axios"

function App() {
  axios 
  .get( "/catalog" ) 
  .then( catalog => {
    console.log(catalog); 
  }) 
  .catch( err => {
    console.log(err);
  });
  
  return  <Router></Router>

}

export default App
