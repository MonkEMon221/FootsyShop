import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const exsistingUser = localStorage.getItem("cart");
    if (exsistingUser) setCart(JSON.parse(exsistingUser));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export { CartContext, CartProvider };
