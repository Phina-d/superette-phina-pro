import React, { createContext, useEffect, useState } from "react";
import { getCart, getFavorites } from "../data/cartManager";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  const updateCounts = () => {
    const cart = getCart();
    const favs = getFavorites();
    const totalQty = cart.reduce((sum, p) => sum + p.qty, 0);

    setCartCount(totalQty);
    setFavCount(favs.length);
  };

  useEffect(() => {
    updateCounts();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, favCount, updateCounts }}>
      {children}
    </CartContext.Provider>
  );
}
