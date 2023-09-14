import React from "react";

import { Shop } from "../hooks/useShop";

interface ShopsContextValue {
  shops: Shop[];
  setShops: (shops: Shop[]) => void;
}

const ShopsContext = React.createContext<ShopsContextValue>({
  shops: [],
  setShops: () => {},
});

ShopsContext.displayName = "Shops Context";

export default ShopsContext;
