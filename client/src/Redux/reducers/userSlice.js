import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, registration, checkAuth } from '../../services/AuthService.ts'
import { setAuthToken } from '../../components/Token/index.js';


const initialState = {
    user: {},
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
            return response
        },
    );
   


export const Logout = createAsyncThunk(
        'logout/setLogout',
        () => {            
            localStorage.removeItem('token')
        },
    );

   

export const CheckAuth = createAsyncThunk(
        'checkAuth/isAuth',
        async () => {
            const response = await checkAuth();
            console.log(response);           
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
                state.user = JSON.parse(action.payload.config.data).loginOrEmail;
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
                state.user = action.payload.data;
            },
            [Registration.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.user = {};
            },                        
            [CheckAuth.pending]: (state) => {
                state.status = 'loading';
            },
            [CheckAuth.fulfilled]: (state, action) => {
                state.isAuth = true;
                state.user = action.payload.data.email;
            },
            [CheckAuth.rejected]: (state, action) => {
                state.status = 'rejected: error ' + action.payload;
                state.user = action.payload;
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
               
        }
    });


    
export default userSlice.reducer

      
