import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const toast = useToast();
  
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, quantity) => {
    if (!product || !size) {
      toast.error("Please select a size before adding to cart");
      return;
    }

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
    
    toast.success(`${product.title || 'Item'} added to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    if (!productId || !size) {
      console.error("Cannot remove from cart: Missing productId or size");
      return;
    }
    
    setCartItems(prev =>
      prev.filter(item => !(item.product._id === productId && item.size === size))
    );
    
    toast.info("Item removed from cart");
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.product.price_from * item.quantity),
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      isCartOpen, 
      setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}