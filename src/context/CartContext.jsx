import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item.product._id === product._id && item.size === size
      );
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prev =>
      prev.filter(item => !(item.product._id === productId && item.size === size))
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}