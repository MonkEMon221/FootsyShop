import { useContext } from "react";
import { CartContext } from "./Cart";

const useCart = () => useContext(CartContext);

export default useCart;
