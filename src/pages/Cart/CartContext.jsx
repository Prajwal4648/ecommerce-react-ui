import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
 
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [discount, setDiscount] = useState(() => {
    const stored = sessionStorage.getItem('discount');
    return stored ? parseFloat(stored) : 0;
  });

  const [isPromoApplied, setIsPromoApplied] = useState(() => {
    const stored = sessionStorage.getItem('isPromoApplied');
    return stored ? JSON.parse(stored) : false;
  });

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    sessionStorage.setItem('discount', discount.toString());
  }, [discount]);

  
  useEffect(() => {
    sessionStorage.setItem('isPromoApplied', JSON.stringify(isPromoApplied));
  }, [isPromoApplied]);

 
const addToCart = (product) => {
  // Create a unique identifier for the product (considering size for clothing)
  const existing = cartItems.find((item) => {
    // If the product has a selected size, match both id and size
    if (product.selectedSize) {
      return item.id === product.id && item.selectedSize === product.selectedSize;
    }
    // For non-clothing items, just match by id
    return item.id === product.id;
  });
  
  if (existing) {
    // Product already exists - increase its quantity
    setCartItems((prev) =>
      prev.map((item) => {
        // Check if this is the same item (considering size for clothing)
        const isSameItem = product.selectedSize 
          ? (item.id === product.id && item.selectedSize === product.selectedSize)
          : (item.id === product.id);
          
        return isSameItem
          ? { ...item, quantity: item.quantity + product.quantity }
          : item;
      })
    );
  } else {
    // Product doesn't exist - add new item
    setCartItems((prev) => [...prev, product]);
  }
};

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };


  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setIsPromoApplied(false);
    localStorage.removeItem('cart');

    sessionStorage.removeItem('discount');
    sessionStorage.removeItem('isPromoApplied');
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


export const useCart = () => useContext(CartContext);