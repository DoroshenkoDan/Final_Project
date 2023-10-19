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
            const itemToAdd = action.payload;

            // Ищем товар в корзине по id
            const existingItem = state.cart.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                // Если товар уже есть в корзине, добавляем переданное количество к текущему количеству
                existingItem.Quantity += itemToAdd.Quantity;
            } else {
                // Если товар не найден, добавляем новый товар в корзину
                state.cart.push(itemToAdd);
            }
        },
        removeFromCart(state, action) {
            const idToRemove = action.payload;
            const itemIndex = state.cart.findIndex(item => item.id === idToRemove);
            if (itemIndex !== -1) {
                state.cart.splice(itemIndex, 1); // Удаляем объект по индексу
            }
        },
        incrementQuantity(state, action) {
            const id = action.payload;


            const product = state.cart.find((item) => item.id === id);
            if (product) {

                product.prodQuantity += 1;
            }
        },
        dicrementQuantity(state, action) {
            const id = action.payload;


            const product = state.cart.find((item) => item.id === id);
            console.log("asdjasjdjaksjkdl", product, id);
            if (product) {

                product.prodQuantity = product.prodQuantity - 1;
            }
        },
        clearCart(state, action) {
            state.cart = [];
        },
        openCartForm(state) {
            state.status = true;
        },
        closeCartForm(state) {
            state.status = false;
        },
    }
})


export default cartReducer.reducer
export const { addToCart, removeFromCart, incrementQuantity, dicrementQuantity, clearCart, openCartForm, closeCartForm } = cartReducer.actions;
