// CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [discount, setDiscount] = useState(() => {
    const stored = sessionStorage.getItem("discount");
    return stored ? parseFloat(stored) : 0;
  });

  const [isPromoApplied, setIsPromoApplied] = useState(() => {
    const stored = sessionStorage.getItem("isPromoApplied");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    sessionStorage.setItem("discount", discount.toString());
  }, [discount]);

  useEffect(() => {
    sessionStorage.setItem("isPromoApplied", JSON.stringify(isPromoApplied));
  }, [isPromoApplied]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => {
      if (product.size) {
        return (
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
        );
      }
      return item.id === product.id;
    });

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) => {
          const isSameItem = product.size
            ? item.id === product.id &&
              item.size === product.size &&
              item.color === product.color
            : item.id === product.id;

          return isSameItem
            ? { ...item, quantity: item.quantity + product.quantity }
            : item;
        })
      );
    } else {
      setCartItems((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (targetItem) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === targetItem.id &&
            item.size === targetItem.size &&
            item.color === targetItem.color
          )
      )
    );
  };

  const updateQuantity = (targetItem, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === targetItem.id &&
        item.size === targetItem.size &&
        item.color === targetItem.color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setIsPromoApplied(false);
    localStorage.removeItem("cart");
    sessionStorage.removeItem("discount");
    sessionStorage.removeItem("isPromoApplied");
  };

  const applyPromo = (discountAmount) => {
    setDiscount(discountAmount);
    setIsPromoApplied(true);
  };

  const removePromo = () => {
    setDiscount(0);
    setIsPromoApplied(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        discount,
        isPromoApplied,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
