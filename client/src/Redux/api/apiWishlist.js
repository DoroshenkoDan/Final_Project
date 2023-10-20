import axios from 'axios'
import {HOST} from '../../components/Token'

export default async function api(apiName) {
    try {
        const response = await axios.put(HOST + `/${apiName}`);
        const data = response.data;
        console.log("dobavleno");
        return data;
    } catch (e) {
        console.log(e);
    }
}

export async function deleteFromList(apiName) {
    try {
        const response = await axios.delete(HOST + `/${apiName}`);
        const data = response.data;
        console.log("unichtozheno");
        console.log(data)
        return data;
    } catch (e) {
        console.log(e);
    }
}