import React from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import axios from "axios"

function App() {

//  const getCatalog = async ()=>{
//   try {
//     const response = await fetch('http://localhost:4000');
//     const data =  await response;
//     console.log(await data);
    
// } catch (e) {
//     return ( console.log(e.message))
    
// }
// }
// getCatalog()

  axios 
  .get( "http://localhost:4000/api/catalog" ) 
  .then( catalog => {
    console.log(catalog); 
  }) 
  .catch( err => {
    console.log(err);
  });
  
  return  <Router></Router>

}

export default App
