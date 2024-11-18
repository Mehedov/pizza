import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	limit: 8,
	page: 1,
}

const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setPage(state, action) {
			state.page = action.payload
		},
	},
})

export const { setPage } = paginationSlice.actions
export default paginationSlice.reducer
