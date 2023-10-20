import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCatalog } from '../../services/CatalogService.ts'
// import api from '../api/api'

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
}
export const fetchCategories = createAsyncThunk(
  'categoriesReducer/fetchProducts',
  async () => {
    const response = await getCatalog()
    return response.data
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
