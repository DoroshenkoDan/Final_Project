import React from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import axios from "axios"



function App() {

//   const newCategory = {
//     id: "women",
//     name: "women",
//     parentId: "null",
//     imgUrl: "img/catalog/women.png",
//     description: "A category, that represents products for women",
//     level: 0
//   };
  
//   axios
//     .post("http://localhost:4000/api/catalog", newCategory)
//     .then(newCategory => {
//       console.log(newCategory);
//     })
//     .catch(err => {
//       console.log(err);
//     });
  
//   // Child category
  
//   // const newCategory = {
//   //   id: "women-shoes",
//   //   name: "shoes",
//   //   parentId: "women",
//   //   imgUrl: "img/catalog/women-shoes.png",
//   //   description: "A category, that represents shoes for women",
//   //   level: 1
//   // };
  
//   // axios
//   //   .post("/catalog", newCategory)
//   //   .then(newCategory => {
//   //     /*Do something with newCategory*/
//   //   })
//   //   .catch(err => {
//   //     /*Do something with error, e.g. show error to user*/
//   //   });

// //  async function getCatalog (){
// //   try {
// //     const response = await fetch('http://localhost:4000/api/catalog');
// //     const data =  await response;
// //     console.log(data);
    
// // } catch (e) {
// //     return ( console.log(e.message))
    
// // }
// // }
// // getCatalog()

// //  async function getCatalog (){
// //   try {
// //     axios 
// //     .get( "http://localhost:4000/api/catalog" ) 
// //     .then( catalog => {
// //       console.log(catalog); 
// //     }) 
    
// // } catch (e) {
// //     return ( console.log(e.message))
    
// // }
// // }
// // getCatalog()

// (async () => {
//   const response = await fetch ("http://localhost:4000/api/catalog");
//     const data =  await response;
//     console.log(data);
//   // for (const i of data) {
//   //     console.log(await i);
//   // }
// })();


  axios 
  .get( "http://localhost:4000/api/products" ) 
  .then( catalog => {
    console.log(catalog); 
  }) 
  .catch( err => {
    console.log("err" + err);
  });
  
  return  <Router></Router>

}

export default App
