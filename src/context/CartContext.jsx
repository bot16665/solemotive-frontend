import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext();
const CART_STORAGE_KEY = "solemotive_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;
    }
    return parseFloat(price) || 0;
  };

  const addToCart = (item) => {
    if (!item.id || !item.size || !item.price) {
      console.error("Invalid item:", item);
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1, price: formatPrice(item.price) }];
    });
  };

  const removeFromCart = (itemId, size) => {
    if (!itemId || !size) {
      console.error("Invalid item ID or size");
      return;
    }
    setCart((prevCart) => prevCart.filter((item) => !(item.id === itemId && item.size === size)));
  };

  const updateQuantity = (itemId, size, newQuantity) => {
    if (!itemId || !size || typeof newQuantity !== "number" || newQuantity < 0) {
      console.error("Invalid parameters for updateQuantity");
      return;
    }

    setCart((prevCart) =>
      newQuantity === 0
        ? prevCart.filter((item) => !(item.id === itemId && item.size === size))
        : prevCart.map((item) =>
            item.id === itemId && item.size === size ? { ...item, quantity: newQuantity } : item
          )
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
  };

  const getCartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = formatPrice(item.price);
      return total + price * (item.quantity || 1);
    }, 0).toFixed(2);
  }, [cart]);

  const getItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
  }), [cart, getCartTotal, getItemCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
