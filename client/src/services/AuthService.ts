import { setAuthToken, API_URL } from "../http";
import axios from "axios";



export async function login({loginOrEmail, password}) {
return await axios.post(API_URL + '/customers/login', {loginOrEmail, password})
}

export async function registration({firstName, lastName, login, email, password, telephone, isAdmin}) {
    return await axios.post(API_URL + '/customers', {firstName, lastName, login, email, password, telephone, isAdmin})
    }

export async function checkAuth() {
        setAuthToken(localStorage.getItem('token'))
        return await axios.get(API_URL + '/customers/customer')
        
        }

