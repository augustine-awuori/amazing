import React from "react";

import { Shop } from "../hooks/useShop";

interface ShopContextValue {
  shop: Shop | null;
  setShop: (shop: Shop) => void;
}

const ShopContext = React.createContext<ShopContextValue>({
  shop: null,
  setShop: () => {},
});

ShopContext.displayName = "Shop Context";

export default ShopContext;
