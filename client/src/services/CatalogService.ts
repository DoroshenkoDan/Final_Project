import $api from "../http";
// import { AxiosResponse } from "axios";


export async function getCatalog() {
return $api.get('/catalog')
}

