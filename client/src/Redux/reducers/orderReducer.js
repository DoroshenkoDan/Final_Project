import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: [],
    orderStatus: false,
}

export const ordersReducer = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addToOrders(state, action) {
            const orderToAdd = action.payload
            state.orders.push(orderToAdd)
            console.log(state.orders)

        },
    },
})

export default ordersReducer.reducer
export const {
    addToOrders,
} = ordersReducer.actions