import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, decrementItem, removeItem } from '../redux/slices/cartSlice';
import Button from './Button/Button';

const CartItem = ({ title, imageUrl, id, sizes, types }) => {
    const dispatch = useDispatch();

    const cartItem = useSelector(state =>
        state.cartReducer.items.find(obj => obj.id === id),
    );
    const count = cartItem ? cartItem.count : 0;
    const price = cartItem ? cartItem.count * cartItem.price : cartItem.price;
    const isCount = cartItem.count > 0;

    const onClickPlus = () => {
        dispatch(addItem({ id }));
    };

    const onClickMinus = () => {
        if (isCount) {
            dispatch(decrementItem({ id }));
        }
    };

    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить товар?')) {
            dispatch(removeItem(id));
        }
    };

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>
                    {types === 'тонкая' ? 'Тонкое' : 'Традиционное'} тесто, {sizes} см.
                </p>
            </div>
            <div className="cart__item-count">
                <div
                    className="button button--outline button--circle cart__item-count-minus"
                    onClick={onClickMinus}
                >
                    <svg
                        width={15}
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 512 512"
                    >
                        <path
                            d="M417.4 224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z"
                            fill="#eb5a1e"
                            className="fill-000000"
                        ></path>
                    </svg>
                </div>
                <b>{count}</b>
                <div
                    className="button button--outline button--circle cart__item-count-plus"
                    onClick={onClickPlus}
                >
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </div>
            </div>
            <div className="cart__item-price">
                <b>{price}</b>
            </div>
            <div className="cart__item-remove" onClick={onClickRemove}>
                <Button className="button--circle" outline>
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
