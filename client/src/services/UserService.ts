import axios from 'axios'

export function fetchUsers(){
return axios.get('/customers')
}