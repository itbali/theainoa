import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpened: false,
    setIsCartOpened: () => null,
});

export const CartProvider = ({ children }) => {
    const [isCartOpened, setIsCartOpened] = useState(false);

    const value = { isCartOpened, setIsCartOpened };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
