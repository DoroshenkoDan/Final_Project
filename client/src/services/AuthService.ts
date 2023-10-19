import $api from "../http";
// import { AxiosResponse } from "axios";


export async function login(email, password) {
return $api.post('/customers', {email, password})
}

export async function registration({firstName, lastName, login, email, password, telephone}) {
    return $api.post('/customers', {firstName, lastName, login, email, password, telephone})
    }
export async function logout() {
        return $api.post('/logout')
        }
        

