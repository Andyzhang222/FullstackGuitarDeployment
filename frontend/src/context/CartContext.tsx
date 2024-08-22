// src/context/CartContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { CartItem } from '../types/cartTypes';

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
