import { createContext } from "react";

import { Shop } from "../hooks/useShop";

interface ShopsContextValue {
  shops: Shop[];
  setShops: (shops: Shop[]) => void;
}

const ShopsContext = createContext<ShopsContextValue>({
  shops: [],
  setShops: () => {},
});

ShopsContext.displayName = "Shops Context";

export default ShopsContext;
