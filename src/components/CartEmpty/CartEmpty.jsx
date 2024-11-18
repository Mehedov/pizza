import React from 'react';
import emptyImg from '../../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая</h2>
            <p>
                Вероятнее всего, вы не заказывали еще пиццу. <br />
                Для того, чтобы заказать пиццу, перейди на главную
                страницу.
            </p>
            <img src={emptyImg} />
            <Link className="button button--black" to="/">
                <span>Вернуться назад</span>
            </Link>
        </div>
    );
};

export default CartEmpty;