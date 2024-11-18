import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { STATUSES } from '../../constants/statuses.js'

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({ ...params }) => {
        const { data } = await axios.get(import.meta.env.REACT_APP_API_URL, { params })
        return data
    },
)


const initialState = {
    items: [],
    status: STATUSES.PENDING,
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = STATUSES.PENDING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = STATUSES.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = STATUSES.ERROR
            state.items = []
        })
    },
})

export const { setItems } =
    pizzasSlice.actions
export default pizzasSlice.reducer
