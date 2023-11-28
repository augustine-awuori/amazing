import { useContext } from "react";

import { Product } from "../components/shops/product/Card";
import CartContext from "../contexts/CartContext";
import useProducts from "./useProducts";

const useCart = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { products } = useProducts(undefined);

  const add = (productId: string) => {
    const { count, ids } = { ...cartProducts };

    if (hasProduct(productId)) return;
    ids[productId] = productId;

    setCartProducts({ count: count + 1, ids });
  };

  const remove = (productId: string) => {
    const { count, ids } = { ...cartProducts };

    if (!hasProduct(productId)) return;
    delete ids[productId];

    setCartProducts({ count: count - 1, ids });
  };

  const clear = () => setCartProducts({ count: 0, ids: {} });

  function hasProduct(productId: string): boolean {
    return cartProducts.ids[productId] ? true : false;
  }

  const getProducts = (): Product[] => {
    const found: Product[] = [];

    products.forEach((p) => {
      if (hasProduct(p._id)) found.push(p);
    });

    return found;
  };

  return {
    add,
    clear,
    count: cartProducts.count,
    getProducts,
    hasProduct,
    remove,
  };
};

export default useCart;
