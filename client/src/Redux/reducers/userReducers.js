import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    login: '',
    password: '',
  },
  status: false,
}

const userReducers = createSlice({
  name: 'userReducers',
  initialState,
  reducers: {
    changeStatusTrue(state, action) {
      state.status = true
    },
    changeData(state, action) {
      const updatedData = { ...action.payload }
      console.log(updatedData)

      state.data = { ...updatedData }
    },
    resetData(state) {
      const data = {
        login: '',
        password: '',
      }
      state.data = { ...data }
    },
    resetStatus(state) {
      state.status = false
    },
  },
})

export const { changeData, changeStatusTrue, resetStatus, resetData } =
  userReducers.actions

export default userReducers.reducer
