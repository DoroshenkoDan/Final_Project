import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {HOST} from "../../components/Token";
import axios from "axios";

export const CheckAuth = createAsyncThunk(
    'checkAuth/isAuth',
    async () => {
      const response = await axios.get(HOST + '/customers/customer')
      return response.data
    },
);


const initialState = {
  data: {},
  status: false,
  token: false,
  statusCustomer: 'idle',
  error:'',
}

const userReducers = createSlice({
  name: 'userReducers',
  initialState,
  reducers: {
    changeStatusTrue(state, action) {
      state.status = true
    },
    changeData(state, action) {
      const updatedData = {...action.payload}
      console.log(updatedData)

      state.data = {...updatedData}
    },
    setToken(state, action) {
      const token = action.payload
      state.token = token
    },
    resetData(state) {
      const data = {}
      state.data = {...data}
    },
    resetStatus(state) {
      state.status = false
    },
    resetToken(state) {
      state.token = false
    },
  },
  extraReducers(builder) {
    builder
        .addCase(CheckAuth.pending, (state) => {
          state.statusCustomer = 'loading'
        })
        .addCase(CheckAuth.fulfilled, (state, action) => {
          console.log('action', action)
          state.statusCustomer = 'succeeded'
          state.data = action.payload
          console.log(state.statusCustomer, state.data)
        })
        .addCase(CheckAuth.rejected, (state, action) => {
          state.statusCustomer = 'failed'
        })
  },
})

export const {changeData, changeStatusTrue, resetStatus, resetData, setToken, resetToken} =
    userReducers.actions

export default userReducers.reducer
