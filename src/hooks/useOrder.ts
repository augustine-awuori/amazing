import { useContext } from "react";

import { Product } from "../components/shops/product/Card";
import { Shop } from "./useShop";
import { User } from "./useUser";
import OrderContext from "../contexts/OrderContext";

interface Buyer extends User {
  canceled: boolean;
  hasShop: boolean;
  seen: boolean;
}

export interface Order {
  _id: string;
  buyer: Buyer;
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
