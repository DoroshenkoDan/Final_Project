import axios from "axios";
import { API_URL } from "../http";


export async function getCatalog() {
return axios(API_URL + '/catalog')
}

