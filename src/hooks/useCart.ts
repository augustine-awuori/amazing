import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { figure } from "../utils";
import { Product } from "../components/shops/product/Card";
import CartContext from "../contexts/CartContext";
import useProducts from "./useProducts";

export interface CartProduct extends Product {
  deleted: boolean;
}

const useCart = () => {
  const context = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { products } = useProducts(undefined);

  const count = context.cartProducts.count;
  const results = getProducts();

  useEffect(() => {
    setCartProducts(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, results.length]);

  const add = (productId: string) => {
    const { count, ids } = { ...context.cartProducts };

    if (hasProduct(productId)) return;
    ids[productId] = productId;

    context.setCartProducts({ count: count + 1, ids });
  };

  const remove = (productId: string) => {
    const { count, ids } = { ...context.cartProducts };

    if (!hasProduct(productId)) return;
    delete ids[productId];

    context.setCartProducts({ count: count - 1, ids });
  };

  const clear = () => context.setCartProducts({ count: 0, ids: {} });

  function hasProduct(productId: string): boolean {
    return context.cartProducts.ids[productId] ? true : false;
  }

  function getProducts(): CartProduct[] {
    const found: CartProduct[] = [];

    products.forEach((p) => {
      if (hasProduct(p._id)) found.push({ ...p, deleted: false, quantity: 1 });
    });

    return found;
  }

  const incrementQuantity = (productId: string) => {
    const updated = cartProducts.map((p) => {
      if (p._id === productId) p.quantity += 1;

      return p;
    });

    setCartProducts(updated);
  };

  const decrementQuantity = (id: string) => {
    const updated = cartProducts.map((p) => {
      if (p._id !== id) return p;

      p.quantity === 1
        ? toast.info("Delete it if you really wanna remove")
        : (p.quantity -= 1);

      return p;
    });

    setCartProducts(updated);
  };

  const getGrandTotal = () => {
    const grandTotal = cartProducts.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );

    return figure.addComma(figure.roundToTwoDecimalPlaces(grandTotal));
  };

  return {
    add,
    clear,
    decrementQuantity,
    count,
    getGrandTotal,
    getProducts,
    hasProduct,
    incrementQuantity,
    products: cartProducts,
    remove,
    setProducts: setCartProducts,
  };
};

export default useCart;
