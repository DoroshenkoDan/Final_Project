import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import  {HOST} from "../../components/Token"

export const initialState = {
    data: [],
    status: 'idle',
    error: null,
};

// 


export const fetchAsync = createAsyncThunk(
    'catalogSlice/fetchAsync',    
    async () => {       
  
        // axiosApiInstance.interceptors.response.use((response) => {
        //     return response
        //   }, async function (error) {
        //     const originalRequest = error.config;
        //     if (error.response.status === 403 && !originalRequest._retry) {
        //       originalRequest._retry = true;
        //       await refreshAccessToken()
        //       axios.defaults.headers.common.Authorization = token;
        //       return axiosApiInstance(originalRequest);
        //     }
        //     return Promise.reject(error);
        //   });

         return  axios
           .get( HOST + "/catalog")
           .then( catalog => {
            return console.log(catalog);
        })
        .then(data=>{return data})
        .catch( err => {
            console.log("err" + err);
        });          
    }
)

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,   
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAsync.fulfilled, (state, action) => {
                console.log('action', action)
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
});
// export  {} = catalogtSlice.actions;

export default catalogSlice.reducer