import { useContext } from "react";

import { Product } from "../components/shops/product/Card";
import { Shop } from "./useShop";
import OrderContext from "../contexts/OrderContext";

export interface Order {
  _id: string;
  message?: string;
  products: Product[];
  shop: Shop;
  timestamp: number;
}

export interface NewOrder {
  message?: string;
  products: string[];
  shop: string;
}

const useOrder = () => useContext(OrderContext);

export default useOrder;
