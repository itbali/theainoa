import "./checkout-item.style.scss";

import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    const { addItemToCart, decreseItemCountInCart, removeItemFromCart } =
        useContext(CartContext);

    const decreaseItemHandler = () => decreseItemCountInCart(cartItem);
    const increaseItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={decreaseItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={increaseItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={removeItemHandler}>
                &#10005;
            </span>
        </div>
    );
};

export default CheckoutItem;
