import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/api'
import apiWishlist, { deleteFromList } from '../api/apiWishlist'

const initialState = {
  wishlist: [],
  status: 'idle',
  error: null,
}
export const fetchWishlist = createAsyncThunk(
  'wishlistReducer/fetchWishlist',
  async () => {
    const response = await api('wishlist')
    return response.products
  },
)

export const addToWishlist = createAsyncThunk(
  'wishlistReducer/addToWishlist',
  async (id) => {
    const response = await apiWishlist('wishlist/'+id)
    return response
  },
)
export const removeFromWishlist = createAsyncThunk(
  'wishlistReducer/addToWishlist',
  async (id) => {
    const response = await deleteFromList('wishlist/'+id)
    return response
  },
)
const wishlistReducer = createSlice({
  name: 'wishlistReducer',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        console.log('action', action)
        state.status = 'succeeded'
        state.wishlist = action.payload
        console.log(state.wishlist)
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        console.log('action', action)
        state.status = 'succeeded'
        state.wishlist = action.payload.products
        console.log(state.wishlist)
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default wishlistReducer.reducer
