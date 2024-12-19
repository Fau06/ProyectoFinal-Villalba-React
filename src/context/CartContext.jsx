import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculateTotals = () => {
            try {
                const quantity = cart.reduce((total, item) => total + item.quantity, 0);
                const price = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                
                setTotalQuantity(quantity);
                setTotal(price);
                localStorage.setItem('cart', JSON.stringify(cart));
            } catch (error) {
                console.error('Error calculating totals:', error);
            }
        };

        calculateTotals();
    }, [cart]);

    const addItem = useCallback((item, quantity) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(i => i.id === item.id);
            if (existingItem) {
                return currentCart.map(i => 
                    i.id === item.id 
                        ? {...i, quantity: i.quantity + quantity}
                        : i
                );
            }
            return [...currentCart, {...item, quantity}];
        });
    }, []);

    const removeItem = useCallback((itemId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== itemId));
    }, []);

    const clear = useCallback(() => {
        setCart([]);
        localStorage.removeItem('cart');
    }, []);

    const isInCart = useCallback((itemId) => {
        return cart.some(item => item.id === itemId);
    }, [cart]);

    const contextValue = useMemo(() => ({
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        totalQuantity,
        total
    }), [cart, addItem, removeItem, clear, isInCart, totalQuantity, total]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
