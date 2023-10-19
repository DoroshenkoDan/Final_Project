import axios from 'axios'


export const HOST = 'http://localhost:4000/api'

// function checkUserData() {
//     let userData
//     const reduxStore = JSON.parse(localStorage.getItem('persist:root'))
//     const reduxUserStore = JSON.parse(reduxStore.user)
//     console.log(reduxUserStore.data)
//
//     const localStorageData = localStorage.getItem('userData')
//     console.log(localStorageData)
//
//     if (localStorageData !== null) {
//         userData= JSON.parse(localStorageData)
//         console.log('checked in UserData true', userData)
//     } else {
//         userData = {
//             loginOrEmail: 'customer@gmail.com',
//             password: '1111111',
//         }
//         console.log('checked in UserData false', userData)
//     }
//     return userData
// }
//
export let token

// export async function refreshAccessToken() {
//   await axios
//     .post(HOST + '/customers/login', userData)
//     .then((loginResult) => {
//       token = loginResult.data.token
//       console.log(`==== Login Result`, loginResult)
//       console.log(`==== TOKEN`, token)
//     })
//     .catch((err) => {
//       console.error(err)
//     })
// }

// export const axiosApiInstance = axios.create()
// // Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//     async (config) => {
//         await refreshAccessToken()
//         config.headers = {
//             Authorization: token,
//             Accept: 'application/json',
//             'Content-Type': 'application/x-www-form-urlencoded',
//         }
//         return config
//     },
//     (error) => {
//         Promise.reject(error)
//     },
// )
//
// axiosApiInstance.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async function (error) {
//         const originalRequest = error.config
//         console.log('хуяксиусЕРРОР', error)
//         if (error.response.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true
//             await refreshAccessToken()
//             axios.defaults.headers.common.Authorization = token
//             return axiosApiInstance(originalRequest)
//         }
//         return Promise.reject(error)
//     },
// )

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common.Authorization = token;
        console.log(token)
    } else {
        // Delete auth header
        delete axios.defaults.headers.common.Authorization;
        console.log('blyat no token')
    }
};

function checkUserData(status, data) {
    let userData
    if (status === true) {
        userData = {
            loginOrEmail: data.loginOrEmail,
            password: data.password,
        }
        console.log('checked', userData)
    } else {
        userData = {
            loginOrEmail: 'customer@gmail.com',
            password: '1111111',
        }
        console.log('Hyanya checked')
    }

    return userData
}

export async function refreshAccessToken(status, data) {
    const userData = checkUserData(status, data)
    console.log('checked in refresh', userData)
    try {
        const loginResult = await axios.post(HOST + '/customers/login', userData);
        const token = loginResult.data.token;
        console.log(`==== Login Result`, loginResult);
        console.log(`==== TOKEN`, token);
        console.log('checked');
        return token;
    } catch (err) {
        console.error(err);
        return null; // Вернуть null или другое значение в случае ошибки
    }
}

