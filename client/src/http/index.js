import axios from "axios";
import { token } from "../components/Token";

export const API_URL = `http://localhost:4000/api` 

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Autorization = token
    return config;
})
export default $api

