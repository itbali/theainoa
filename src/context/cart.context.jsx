import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existingItem) {
        return cartItems.map((item) => {
            if (item.id === productToAdd.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
};
const decreaseItemCount = (cartItems, cartItemToRemove) => {
    return cartItems.reduce((acc, cartItem) => {
        if (cartItem.id === cartItemToRemove.id) {
            if (cartItem.quantity > 1) {
                return [
                    ...acc,
                    { ...cartItem, quantity: cartItem.quantity - 1 },
                ];
            } else return [...acc];
        } else {
            return [...acc, cartItem];
        }
    }, []);
};
const removeItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
    isCartOpened: false,
    setIsCartOpened: () => null,
    cartItems: [],
    addItemToCart: () => null,
    decreseItemCountInCart: () => null,
    removeItemFromCart: () => null,
    totalPriceCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpened, setIsCartOpened] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [totalPriceCount, setTotalPriceCount] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    const decreaseItemCountInCart = (cartItemToRemove) => {
        setCartItems(decreaseItemCount(cartItems, cartItemToRemove));
    };
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeItem(cartItems, cartItemToRemove));
    };
    const value = {
        isCartOpened,
        setIsCartOpened,
        addItemToCart,
        cartItems,
        cartItemsCount,
        decreaseItemCountInCart,
        removeItemFromCart,
        totalPriceCount,
    };

    useEffect(() => {
        const count = cartItems.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
        setCartItemsCount(count);
    }, [cartItems]);
    useEffect(() => {
        const totalPrice = cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotalPriceCount(totalPrice);
    }, [cartItems, setTotalPriceCount]);
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
