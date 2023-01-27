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

export const CartContext = createContext({
    isCartOpened: false,
    setIsCartOpened: () => null,
    cartItems: [],
    addItemToCart: () => null,
});

export const CartProvider = ({ children }) => {
    const [isCartOpened, setIsCartOpened] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const [cartItems, setCartItems] = useState([]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    const value = {
        isCartOpened,
        setIsCartOpened,
        addItemToCart,
        cartItems,
        cartItemsCount,
    };

    useEffect(() => {
        const count = cartItems.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
        setCartItemsCount(count);
    }, [cartItems]);
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
