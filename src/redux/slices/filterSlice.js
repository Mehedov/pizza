import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    searchValue: '',
    sortType: {
        name: 'По популярности (DESC)',
        sortProperty: 'rating',
        order: 'desc',
    },
    page: 1,
    limit: 8,
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setSortType(state, action) {
            state.sortType = action.payload
        },
        setPage(state, action) {
            state.page = action.payload
        },
        setFilters(state, action) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId)
                state.page = Number(action.payload.page)
                state.sortType = action.payload.sortType
            } else {
                state.categoryId = 0
                state.page = 1
                state.sortType = {
                    name: 'По популярности (DESC)',
                    sortProperty: 'rating',
                    order: 'desc',
                }
            }
        },
    },
})

export const filterSelector = (state) => state.filterReducer

export const {
    setCategoryId,
    setSearchValue,
    setSortType,
    setPage,
    setFilters,
} = filterSlice.actions
export default filterSlice.reducer
