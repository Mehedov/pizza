import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
    totalCount: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItems = state.items.find(obj => obj.id === action.payload.id)

            if (findItems) {
                findItems.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce(
                (acc, obj) => acc + obj.price * obj.count,
                0,
            )
            state.totalCount = state.items.reduce((acc, obj) => acc + obj.count, 0)
        },
        decrementItem(state, action) {
            const findItems = state.items.find(obj => obj.id === action.payload.id)
            if (findItems) {
                findItems.count--
            }
        },
        removeItem(state, action) {
            const newItems = state.items.filter(obj => obj.id !== action.payload)
            state.items = newItems
            state.totalPrice = state.items.reduce(
                (acc, obj) => acc + obj.price * obj.count,
                0,
            )
            state.totalCount = state.items.reduce((acc, obj) => acc + obj.count, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalCount = 0
            state.totalPrice = 0
        },
        setTotalPrice(state, action) {
            state.totalPrice = action.payload
        },
    },
})

export const { addItem, removeItem, clearItems, setTotalPrice, decrementItem } =
    cartSlice.actions
export default cartSlice.reducer
