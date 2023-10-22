import axios from 'axios'


export const HOST = 'http://localhost:4000/api'

export let token

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

// function checkUserData(status, data) {
//     let userData
//     if (status === true) {
//         userData = {
//             loginOrEmail: data.loginOrEmail,
//             password: data.password,
//         }
//         console.log('checked', userData)
//     } else {
//         userData = {
//             loginOrEmail: 'customer@gmail.com',
//             password: '1111111',
//         }
//         console.log('Hyanya checked')
//     }
//
//     return userData
// }
//
// export async function refreshAccessToken(status, data) {
//     const userData = checkUserData(status, data)
//     console.log('checked in refresh', userData)
//     try {
//         const loginResult = await axios.post(HOST + '/customers/login', userData);
//         const token = loginResult.data.token;
//         console.log(`==== Login Result`, loginResult);
//         console.log(`==== TOKEN`, token);
//         console.log('checked');
//         return token;
//     } catch (err) {
//         console.error(err);
//         return null; // Вернуть null или другое значение в случае ошибки
//     }
// }

