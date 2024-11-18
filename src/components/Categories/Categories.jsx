import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterSelector, setCategoryId } from '../../redux/slices/filterSlice'
import styles from './Categories.module.scss'

const Categories = React.memo(() => {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]


    const { categoryId } = useSelector(filterSelector)
    const dispatch = useDispatch()

    return (
        <div className={styles.categories}>
            <ul>
                {categories.map((category, index) => (
                    <li
                        className={categoryId === index ? styles.active : null}
                        key={index}
                        onClick={() => dispatch(setCategoryId(index))}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default Categories
