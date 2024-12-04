import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CartContext = createContext();

// Proveedor que gestiona el estado del carrito
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        console.log(`Producto agregado: ${product.name}`);
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log(`Producto con ID ${id} eliminado del carrito.`);
    };

    // Función para actualizar la cantidad de un producto
    const updateQuantity = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para consumir el contexto
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};
