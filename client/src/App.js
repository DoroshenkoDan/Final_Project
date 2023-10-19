import React from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import Store from './Redux/store.js'

// import { fetchAsync } from "./Redux/reducers/catalogSlice";

// import axios from "axios";
// import  {refreshAccessToken, axiosApiInstance, token} from "./components/Token"

// const HOST = 'http://localhost:4000/api'

// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     await refreshAccessToken()
//     axios.defaults.headers.common.Authorization = token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });

function App() {
  return (
    <Store>
      <Router></Router>
    </Store>
  )
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //       dispatch(fetchAsync());
  // }, []);

  //   const catalog = useSelector(state => state.catalogSlice.catalog);

  //   console.log(catalog);

  // const newCatalog = {
  //   "id": "pots",
  //   "name": "pots",
  //   "parentId": "null",
  //   "__v": 0,
  //   "date": "2019-10-06T13:50:11.859Z"
  // }

  // axiosApiInstance
  //       .post(HOST + "/catalog", newCatalog)
  //       .then(res => {
  //           console.log('New product added', res)
  //       })
  //       .catch(err => {
  //           console.error('Error on add product', err)
  //       });

  // axios
  //   .get(HOST + "/catalog")
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // Child category

  // axios
  // .get( HOST + "/catalog")
  // .then( products => {
  //   console.log(products);
  // })
  // .catch( err => {
  //   console.log("err" + err);
  // });
}

export default App
