import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";
import "./card-icon.style.scss";

const CardIcon = () => {
    const { isCartOpened, setIsCartOpened } = useContext(CartContext);
    console.log("toggleIsCartOpened");
    const toggleIsCartOpened = () => {
        setIsCartOpened(!isCartOpened);
    };
    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpened}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">0</span>
        </div>
    );
};

export default CardIcon;
