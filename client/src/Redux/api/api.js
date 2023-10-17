import axios from 'axios'
import {HOST} from '../../components/Token'

export default async function api(apiName) {
    try {
        const response = await axios.get(HOST + `/${apiName}`);
        const data = response.data;
        return data;
    } catch (e) {
        console.log(e);
    }
}
