import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, registration, logout, checkAuth } from '../../services/AuthService.ts'
import { setAuthToken } from '../../components/Token/index.js';

// import { API_URL } from '../../http/index.js';
// import $api from '../../http/index.js';
// import axios from 'axios';
// import axios from 'axios';
// import axios from 'axios';

const initialState = {
    user: {
        loginOrEmail: "",
        password: ""
    },
    isAuth: false,
    status: '',
}


export const Login = createAsyncThunk(
    'login/setLogin',
    async ({loginOrEmail, password}) => {
      const response = await login({loginOrEmail, password});
      localStorage.setItem('token', response.data.token)
      setAuthToken((response.data.token))
      console.log(response);
      return response
    },
);


export const Registration = createAsyncThunk(
        'registration/setRegistration',
        async ({firstName, lastName, login, email, password, telephone, isAdmin}) => {
            const response = await registration({firstName, lastName, login, email, password, telephone, isAdmin});
            console.log(response);
            return response.data
        },
    );

    


    export const Logout = createAsyncThunk(
        'logout/setLogout',
        async () => {
            const response = await logout();
            localStorage.removeItem('token');
          return response
        },
    );

    export const CheckAuth = createAsyncThunk(
        'checkAuth/isAuth',
        async () => {
            const response = await checkAuth();
            console.log(response);
            localStorage.setItem('token', response.data.token);
          return response
        },
    );

    const userSlice = createSlice({
        name: 'userSlice',
        initialState,   
        extraReducers: {
            [Login.pending]: (state) => {
                state.status = 'loading';
            },
            [Login.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.isAuth = true;
                state.user = action.payload;
            },
            [Login.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.user = {};
            },
            [Registration.pending]: (state) => {
                state.status = 'loading';
            },
            [Registration.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.isAuth = true;
                state.user = action.payload;
            },
            [Registration.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.user = {};
            },
            [Logout.pending]: (state) => {
                state.status = 'loading';
            },
            [Logout.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.isAuth = false;
                state.user = {};
            },
            [Logout.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.user = {};
            },
            [CheckAuth.pending]: (state) => {
                state.status = 'loading';
            },
            [CheckAuth.fulfilled]: (state, action) => {
                state.isAuth = true;
                state.user = {};
            },
            [CheckAuth.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.user = action.payload;
            },

    
        }
    });


    
export default userSlice.reducer
      
