import Router from './routers/Router'
import './scss/reset.scss'
import Store from './Redux/store.js'
import { CheckAuth } from './Redux/reducers/userSlice'
import {useSelector, useDispatch} from "react-redux";
import React, { useEffect } from "react";


function App() {
  const { isAuth } = useSelector((store) => store.userSlice);
  const user = useSelector(state => state.userSlice.user);
 
  const dispatch = useDispatch();
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      dispatch(CheckAuth()
      )
    }

  },[])


  return (  
     <Store>
            <h1>{isAuth ? `Пользователь  ${user} зарегистрирован` : `АВТОРИЗУЙТЕCЬ`}</h1>
      <Router></Router>
    </Store>
      )      
   
}

export default App
