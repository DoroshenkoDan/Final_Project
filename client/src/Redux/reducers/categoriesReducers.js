import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import api from '../api/api'
import exportedObject from '../api/api.js'

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
}
export const fetchCategories = createAsyncThunk(
  'categoriesReducer/fetchProducts',
  async () => {
    const response = await exportedObject.api('catalog')
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
