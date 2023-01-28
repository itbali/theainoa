import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../card-item/card-item.component";
import "./cart-dropdown.stylec.scss";

const CartDropdown = () => {
    const { cartItems, setIsCartOpened } = useContext(CartContext);
    const navitage = useNavigate();

    const goToCheckoutHandler = () => {
        setIsCartOpened(false);
        navitage("/checkout");
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem} />;
                })}
            </div>
            <Button onClick={goToCheckoutHandler}>Got to checkout</Button>
        </div>
    );
};

export default CartDropdown;
