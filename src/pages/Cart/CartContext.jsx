import React, { createContext, useContext, useState, useEffect } from "react";


// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {

    
  // Initialize cartItems from localStorage (if available)
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity of item
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear all cart items
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => useContext(CartContext);
