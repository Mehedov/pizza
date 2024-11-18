import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortType } from '../../redux/slices/filterSlice'
import styles from './Sort.module.scss'

export const sortPopup = [
	{ name: 'По популярности (DESC)', sortProperty: 'rating', order: 'desc' },
	{ name: 'По популярности (ASC)', sortProperty: '-rating', order: 'asc' },
	{ name: 'По цене (DESC)', sortProperty: 'price', order: 'desc' },
	{ name: 'По цене (ASC)', sortProperty: 'price', order: '-asc' },
	{ name: 'По алфавиту (DESC)', sortProperty: 'title', order: 'desc' },
	{ name: 'По алфавиту (ASC)', sortProperty: 'title', order: '-asc' },
]

const Sort = React.memo(({ isVisible, setIsVisible }) => {
	const { name } = useSelector(state => state.filterReducer.sortType)

	const sortRef = React.useRef()

	const dispatch = useDispatch()

	const changeSort = property => {
		dispatch(setSortType(property))
		setIsVisible(false)
	}

	const clickSort = e => {
		setIsVisible(!isVisible)
		e.stopPropagation()
	}
	
	React.useEffect(() => {
		document.body.addEventListener('click', event => {
			if (!event.composedPath().includes(sortRef.current)) {
				setIsVisible(false)
			}
		})
	}, [])

	return (
		<div className={styles.sort}>
			<div className={styles.sort__label}>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка:</b>
				<span ref={sortRef} onClick={e => clickSort(e)}>
					{name}
				</span>
			</div>
			{isVisible && (
				<div className={styles.sort__popup}>
					<ul>
						{sortPopup.map((obj, index) => (
							<li
								key={index}
								onClick={() => changeSort(obj)}
								className={name === obj.name ? 'active' : null}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
})

export default Sort
