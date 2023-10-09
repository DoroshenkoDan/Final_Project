import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import  {refreshAccessToken, axiosApiInstance, HOST, token} from "../../components/Token"

export const initialState = {
    catalog: [],
    status: '',
};

// 


export const fetchAsync = createAsyncThunk(
    'catalogSlice/fetchAsync',    
    async () => {       
  
        axiosApiInstance.interceptors.response.use((response) => {
            return response
          }, async function (error) {
            const originalRequest = error.config;
            if (error.response.status === 403 && !originalRequest._retry) {
              originalRequest._retry = true;
              await refreshAccessToken()
              axios.defaults.headers.common.Authorization = token;
              return axiosApiInstance(originalRequest);
            }
            return Promise.reject(error);
          });

           axios
           .get( HOST + "/catalog")
           .then( catalog => {
            return console.log(catalog);;
        })
        .catch( err => {
            console.log("err" + err);
        });          
    }
)

const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,   
    extraReducers: {
        [fetchAsync.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchAsync.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.catalog = action.payload;
        },
        [fetchAsync.rejected]: (state, action) => {
            state.status = 'rejected: error ' + action.payload;
            state.catalog = [];
        }

    }
});
// export  {} = catalogtSlice.actions;

export default catalogSlice.reducer