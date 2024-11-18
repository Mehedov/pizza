import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { filterSelector, setPage } from '../../redux/slices/filterSlice'
import styles from './Pagination.module.scss'

const Pagination = React.memo(() => {
    const { limit } = useSelector(filterSelector)
    const dispatch = useDispatch()

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => dispatch(setPage(event.selected + 1))}
            pageRangeDisplayed={5}
            pageCount={Math.floor(16 / limit)}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
})

export default Pagination
