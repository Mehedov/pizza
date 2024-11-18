import debounce from 'lodash.debounce'
import React from 'react'
import { useDispatch } from 'react-redux'
import closeSvg from '../../assets/img/close.svg'
import searchSvg from '../../assets/img/search.svg'
import { setSearchValue } from '../../redux/slices/filterSlice'
import styles from './Search.module.scss'

const Search = () => {
	const dispatch = useDispatch()
	const [localSearchValue, setLocalSearchValue] = React.useState('')

	const inputRef = React.useRef()

	const onClickClear = () => {
		setLocalSearchValue('')
		dispatch(setSearchValue(''))
		inputRef.current.focus()
	}

	const debouncedSetSearchValue = React.useCallback(
		debounce(str => {
			dispatch(setSearchValue(str))
		}, 350),
		[]
	)

	const onChangeInput = value => {
		setLocalSearchValue(value)
		debouncedSetSearchValue(value)
	}
	return (
		<div className={styles.root}>
			<input
				ref={inputRef}
				value={localSearchValue}
				onChange={e => onChangeInput(e.target.value)}
				className={styles.input}
				placeholder='Поиск'
			/>
			{localSearchValue ? (
				<img onClick={onClickClear} className={styles.close} src={closeSvg} />
			) : (
				<img src={searchSvg} className={styles.search} width={25} />
			)}
		</div>
	)
}
export default Search
