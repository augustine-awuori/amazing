import { createContext } from "react";

import { Shop } from "../hooks/useShop";

interface ShopContextValue {
  shop: Shop | null;
  setShop: (shop: Shop | null) => void;
}

const ShopContext = createContext<ShopContextValue>({
  shop: null,
  setShop: () => {},
});

ShopContext.displayName = "Shop Context";

export default ShopContext;
