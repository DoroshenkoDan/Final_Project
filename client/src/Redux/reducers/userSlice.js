import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, registration, logout } from '../../services/AuthService.ts'
import { API_URL } from '../../http/index.js';
import axios from 'axios';

const initialState = {
    user: {},
    isAuth: false,
    status: ""
}


export const Login = createAsyncThunk(
    'login/setLogin',
    async ({loginOrEmail, password}) => {
      const response = await login({loginOrEmail, password});
      localStorage.setItem('token', response.data.token)
      console.log(response);
      return response
    },
);


export const Registration = createAsyncThunk(
        'registration/setRegistration',
        async ({firstName, lastName, login, email, password, telephone}) => {
            const response = await registration({firstName, lastName, login, email, password, telephone});
            console.log(response);
            
          return response
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

    export const checkAuth = createAsyncThunk(
        'checkAuth/isAuth',
        async () => {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
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
                state.user = action.payload.user;
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
                state.user = action.payload.user;
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
            [checkAuth.pending]: (state) => {
                state.status = 'loading';
            },
            [checkAuth.fulfilled]: (state, action) => {
                state.isAuth = true;
                state.user = {};
            },
            [checkAuth.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.user = action.payload.user;
            },

    
        }
    });


    
export default userSlice.reducer
      
