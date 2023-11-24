import { useContext } from "react";

import CartContext from "../contexts/CartContext";

const useCart = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const addProduct = (productId: string) => {
    const { count, ids } = { ...cartProducts };

    if (cartHasProduct(productId)) return;
    ids[productId] = productId;

    setCartProducts({ count: count + 1, ids });
  };

  const removeProduct = (productId: string) => {
    const { count, ids } = { ...cartProducts };

    if (!cartHasProduct(productId)) return;
    delete ids[productId];

    setCartProducts({ count: count - 1, ids });
  };

  const clearCart = () => setCartProducts({ count: 0, ids: {} });

  function cartHasProduct(productId: string): boolean {
    return cartProducts.ids[productId] ? true : false;
  }

  return {
    addProduct,
    cartHasProduct,
    clearCart,
    productsId: cartProducts,
    removeProduct,
  };
};

export default useCart;
