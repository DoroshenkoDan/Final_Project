import axios from 'axios'

export const HOST = 'https://store-avion.vercel.app/api'

export let token

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export const getCustomer = async () => {
  const response = await axios.get(HOST + '/customers/customer')
  const customerData = response.data
  return customerData
}
