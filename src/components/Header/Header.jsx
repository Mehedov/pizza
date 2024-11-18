import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cart from '../../assets/img/cart.svg'
import logoSvg from '../../assets/img/pizza-logo.svg'
import Button from '../Button/Button'
import Search from '../Search/Search'
import styles from './Header.module.scss'
import { pageConfig } from '../../config/page.config.js'

const Header = () => {
    const { totalPrice, totalCount } = useSelector(state => state.cartReducer)

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to={pageConfig.home}>
                    <div className={styles.header__logo}>
                        <img width={38} src={logoSvg} />
                        <h1>React Pizza</h1>
                    </div>
                </Link>
                <Search />
                <Link to={pageConfig.cart}>
                    <Button className={styles.button__cart}>
                        <span>{totalPrice}₽</span>
                        <div className={styles.button__delimiter}></div>
                        <img src={cart} alt="Cart" width={18} />
                        <span>{totalCount}</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Header
