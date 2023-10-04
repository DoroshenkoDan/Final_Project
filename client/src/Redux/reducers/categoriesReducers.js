import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import getCategories from "../api/getCategories";

const initialState = {
    categories: [],
    status: 'idle',
    error: null,
}
export const fetchCategories = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await getCategories()
        return response
    },
)

const categoriesReducer = createSlice({
    name: 'categoriesReducer',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                console.log('action', action)
                state.status = 'succeeded'
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default categoriesReducer.reducer