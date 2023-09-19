import React from "react";

import { Product } from "../components/shops/ProductCard";

export type ShopProduct = { [shopId: string]: Product[] };

interface BagContextValue {
  bags: ShopProduct[];
  setBags: (bag: ShopProduct[]) => void;
}

const BagsContext = React.createContext<BagContextValue>({
  bags: [],
  setBags: () => {},
});

BagsContext.displayName = "Bags Context";

export default BagsContext;
