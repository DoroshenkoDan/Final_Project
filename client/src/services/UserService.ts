import $api from "../http"

export function fetchUsers(){
return $api.get('/customers')
}