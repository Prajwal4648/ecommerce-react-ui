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

  // Initialize promo code state from localStorage
  const [discount, setDiscount] = useState(() => {
    const stored = localStorage.getItem('discount');
    return stored ? parseFloat(stored) : 0;
  });

  const [isPromoApplied, setIsPromoApplied] = useState(() => {
    const stored = localStorage.getItem('isPromoApplied');
    return stored ? JSON.parse(stored) : false;
  });

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save discount to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('discount', discount.toString());
  }, [discount]);

  // Save promo applied status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isPromoApplied', JSON.stringify(isPromoApplied));
  }, [isPromoApplied]);

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

  // Clear all cart items and promo code
  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setIsPromoApplied(false);
    localStorage.removeItem('cart');
    localStorage.removeItem('discount');
    localStorage.removeItem('isPromoApplied');
  };

  // Apply promo code
  const applyPromo = (discountAmount) => {
    setDiscount(discountAmount);
    setIsPromoApplied(true);
  };

  // Remove promo code
  const removePromo = () => {
    setDiscount(0);
    setIsPromoApplied(false);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      discount,
      isPromoApplied,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromo,
      removePromo
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => useContext(CartContext);