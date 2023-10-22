import React, {useEffect} from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import Store from './Redux/store.js'
import axios from "axios";
import {HOST, setAuthToken} from "./components/Token";


function App() {
    const loginUser = async (user) => {
        const userData = {
            loginOrEmail: user.data.loginOrEmail,
            password: user.data.password,
        }
        console.log(userData)
        try {
            const loginResult = await axios.post(HOST + "/customers/login", userData);
            const token = loginResult.data.token;
            setAuthToken(token);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const persistRoot = JSON.parse(localStorage.getItem('persist:root'))
        const user = JSON.parse(persistRoot.user)
        console.log(user)
        if (user.status === true) {
            loginUser(user)
            console.log('ураааа ЕБАТЬ')
        } else {
            console.log('ебанутьсяя')
        }
    })

    return (
        <Store>
            <Router></Router>
        </Store>
    )
}

export default App
