import axios from 'axios'
import { HOST } from '../../components/Token'

export default async function api(apiName) {
    let result
    await axios
        .get(HOST + "/products")
        .then(products => {
            result = products.data
            console.log('products fetched', products.data)
        })
        .catch(err => {
            console.error('fetch products failed',err)
        });
    return result
}
