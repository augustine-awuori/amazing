import { useContext } from "react";

import { Product } from "../hooks/useProducts";
import { Shop } from "./useShop";
import { Status } from "./useStatus";
import { User } from "./useUser";
import OrderContext from "../contexts/OrderContext";

export interface Order {
  canceled: boolean;
  seen: boolean;
  _id: string;
  buyer: User;
  message?: string;
  products: Product[];
  shop: Shop;
  status: Status;
  timestamp: number;
}

export interface NewOrder {
  message?: string;
  products: string[];
  shop: string;
  status: string;
}

const useOrder = () => useContext(OrderContext);

export default useOrder;
