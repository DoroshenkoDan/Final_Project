import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, registration, logout } from '../../services/AuthService.ts'

const initialState = {
    user: '',
    isAuth: false
}


export const Login = createAsyncThunk(
    'login/setLogin',
    async (email, password) => {
      const response = await login(email, password);
      console.log(response);
      return response
    },
);


export const Registration = createAsyncThunk(
        'registration/setRegistration',
        async ({firstName, lastName, login, email, password, telephone}) => {
            const response = await registration({firstName, lastName, login, email, password, telephone});
            console.log(await response);
            localStorage.setItem('token', response.data.accessToken);
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

    const userSlice = createSlice({
        name: 'userSlice',
        initialState,   
        extraReducers: {
            [Login.pending]: (state) => {
                state.status = 'loading';
            },
            [Login.fulfilled]: (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
            },
            [Login.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.products = [];
            },
            [Registration.pending]: (state) => {
                state.status = 'loading';
            },
            [Registration.fulfilled]: (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
            },
            [Registration.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.products = [];
            },
            [Logout.pending]: (state) => {
                state.status = 'loading';
            },
            [Logout.fulfilled]: (state, action) => {
                state.isAuth = false;
                state.user = {};
            },
            [Logout.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.products = [];
            },

    
        }
    });


    
export default userSlice.reducer
      
