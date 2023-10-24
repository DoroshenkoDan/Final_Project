import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  cartStatus: false,
}

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemToAdd = action.payload

      const existingItem = state.cart.find((item) => item._id === itemToAdd._id)
      if (existingItem) {
        existingItem.Quantity += itemToAdd.Quantity
      } else {
        state.cart.push(itemToAdd)
      }
    },
    removeFromCart(state, action) {
      const idToRemove = action.payload
      const itemIndex = state.cart.findIndex((item) => item._id === idToRemove)
      if (itemIndex !== -1) {
        state.cart.splice(itemIndex, 1)
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload

      const product = state.cart.find((item) => item._id === id)
      if (product) {
        product.prodQuantity += 1
      }
    },
    dicrementQuantity(state, action) {
      const id = action.payload

      const product = state.cart.find((item) => item._id === id)
      if (product && product.prodQuantity > 1) {
        product.prodQuantity = product.prodQuantity - 1
      }
    },
    clearCart(state, action) {
      state.cart = []
    },
    openCartForm(state) {
      state.status = true
    },
    closeCartForm(state) {
      state.status = false
    },
  },
})

export default cartReducer.reducer
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  dicrementQuantity,
  clearCart,
  openCartForm,
  closeCartForm,
} = cartReducer.actions
