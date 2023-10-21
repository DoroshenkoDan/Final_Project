import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {
        login: '',
        password: '',
    },
    user: '',
    status: false,
    token:''
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
        changeUser(state, action) {
            state.user ={...action.payload }
            console.log('USSSSEEERR THE BEST', state.user)
        },
        setToken(state,action) {
            state.token = action.payload
            console.log(state.token)
        },
        resetToken(state) {
            state.token = ''
        },
        resetData(state) {
            const data = {
                    login: '',
                    password: '',
            }
            state.data = {...data}
            state.user = ''
        },
        resetStatus (state){
            state.status = false
        }
    },
})

export const {changeData, changeStatusTrue, setToken, resetStatus, resetData, resetToken, changeUser} = userReducers.actions

export default userReducers.reducer