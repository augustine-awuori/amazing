import { useContext } from "react";

import { figure } from "../utils";
import { Shop } from "./useShop";
import { Status } from "./useStatus";
import { User } from "./useUser";
import OrderContext from "../contexts/OrderContext";
import useProducts, { Product } from "./useProducts";

export interface OrderProducts {
  [productId: string]: number;
}

export interface Order {
  canceled: boolean;
  seen: boolean;
  _id: string;
  buyer: User;
  message?: string;
  products: OrderProducts;
  shop: Shop;
  status: Status;
  timestamp: number;
}

export interface NewOrder {
  message?: string;
  products: OrderProducts;
  shop: string;
  status: string;
}

export interface OrderedProduct extends Product {
  quantity: number;
}

const useOrder = () => {
  const { getProduct } = useProducts();
  const context = useContext(OrderContext);

  const getOrderedProducts = (products: OrderProducts): OrderedProduct[] => {
    const output: OrderedProduct[] = [];

    Object.entries(products || {}).forEach(async ([id, quantity]) => {
      const { ok, data } = await getProduct(id);

      if (ok) output.push({ ...(data as Product), quantity });
    });

    return output;
  };

  const getOrderedProductsGrandTotal = (products: OrderedProduct[]) => {
    const grandTotal = products.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );

    return figure.addComma(figure.roundToTwoDecimalPlaces(grandTotal));
  };

  return { ...context, getOrderedProducts, getOrderedProductsGrandTotal };
};

export default useOrder;
