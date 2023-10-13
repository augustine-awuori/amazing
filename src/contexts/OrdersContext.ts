import { createContext } from "react";

import { Order } from "../hooks/useOrder";

interface ContextValue {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const OrdersContext = createContext<ContextValue>({
  orders: [],
  setOrders: () => {},
});

OrdersContext.displayName = "Orders Context";

export default OrdersContext;
