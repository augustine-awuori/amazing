import { createContext } from "react";

import { Order } from "../hooks/useOrder";

interface ContextValue {
  order: Order | null;
  setOrder: (order: Order) => void;
}

const OrderContext = createContext<ContextValue>({
  order: null,
  setOrder: () => {},
});

OrderContext.displayName = "Order Context";

export default OrderContext;
