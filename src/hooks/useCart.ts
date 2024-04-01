import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { figure } from "../utils";
import CartContext from "../contexts/CartContext";
import useProducts, { Product } from "./useProducts";

export interface CartProduct extends Product {
  deleted: boolean;
}

const useCart = () => {
  const context = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { products } = useProducts();

  const count = context.cartProducts.count;
  const results = getProducts();

  useEffect(() => {
    setCartProducts(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, results.length]);

  const add = (productId: string) => {
    const { count, ids } = { ...context.cartProducts };

    if (hasProduct(productId)) return;
    ids[productId] = 1;

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
      if (hasProduct(p._id)) found.push({ ...p, deleted: false });
    });

    return found;
  }

  const getProductQuantity = (productId: string): number =>
    context.cartProducts.ids[productId];

  const incrementQuantity = (productId: string) => {
    const prevQuantity = context.cartProducts.ids[productId];

    const ids = { ...context.cartProducts.ids, [productId]: prevQuantity + 1 };
    context.setCartProducts({ count: context.cartProducts.count, ids });
  };

  const decrementQuantity = (productId: string) => {
    const prevQuantity = context.cartProducts.ids[productId];

    if (prevQuantity === 1)
      return toast.info("Delete it if you really wanna remove");

    const ids = { ...context.cartProducts.ids, [productId]: prevQuantity - 1 };
    context.setCartProducts({ count: context.cartProducts.count, ids });
  };

  const getProductsGrandTotal = (cartProducts: CartProduct[]) => {
    const grandTotal = cartProducts.reduce(
      (total, { _id, price }) => total + price * getProductQuantity(_id),
      0
    );

    return figure.addComma(figure.roundToTwoDecimalPlaces(grandTotal));
  };

  const getCartGrandTotal = () => getProductsGrandTotal(cartProducts);

  return {
    add,
    clear,
    count,
    decrementQuantity,
    getCartGrandTotal,
    getProductQuantity,
    getProducts,
    getProductsGrandTotal,
    hasProduct,
    incrementQuantity,
    products: cartProducts,
    remove,
    setProducts: setCartProducts,
  };
};

export default useCart;
