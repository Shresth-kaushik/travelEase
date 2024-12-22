import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (trip) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === trip._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === trip._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...trip, quantity: 1 }];
    });
  };

  const removeFromCart = (tripId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== tripId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

