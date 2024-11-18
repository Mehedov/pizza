import qs from 'qs'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { sortPopup } from '../components/Sort/Sort'
import { addItem } from '../redux/slices/cartSlice'
import { setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice.js'
import { STATUSES } from '../constants/statuses.js'


const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { categoryId, searchValue, sortType, limit, page } = useSelector(
        state => state.filterReducer,
    )
    const { items, status } = useSelector(state => state.pizzasReducer)


    const [isVisible, setIsVisible] = React.useState(false)
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const addToCart = id => {
        const element = items.find(obj => obj.id === id)
        dispatch(addItem(element))
    }

    const skeleton = React.useMemo(() => {
        return [...new Array(8)].map((_, index) => <Skeleton key={index} />)
    }, [])

    const pizzas = React.useMemo(() => {
        return items.map(pizza => {
            if (pizza.types !== undefined) {
                return <PizzaBlock addToCart={addToCart} {...pizza} key={pizza.id} />
            }
        })
    }, [items, categoryId, sortType, searchValue])

    const getPizzas = async () => {
        try {
            dispatch(fetchPizzas({
                page,
                limit,
                category: categoryId > 0 ? categoryId : null,
                search: searchValue ? searchValue : null,
                sortBy: sortType.sortProperty,
                order: sortType.order,
            }))

        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sortType = sortPopup.find(
                obj => obj.sortProperty === params.sortProperty,
            )

            dispatch(
                setFilters({
                    categoryId: params.categoryId,
                    page: params.page,
                    sortType,
                }),
            )

            isSearch.current = true
        }
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortType, searchValue, page])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortProperty: sortType.sortProperty,
                page,
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType.sortProperty, page])

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort isVisible={isVisible} setIsVisible={setIsVisible} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === STATUSES.ERROR ? <div className="content__error-info">
                <h2>Пока пусто</h2>
                <p>Но они скоро все появится.</p>
            </div> : <div className="content__items">{status === STATUSES.PENDING ? skeleton : pizzas}</div>
            }
            <Pagination />
        </div>
    )
}

export default Home
