import { createContext } from "react";

import { Product } from "../hooks/useProducts";

export type ShopProduct = { [shopId: string]: Product[] };

interface BagContextValue {
  bags: ShopProduct[];
  setBags: (bag: ShopProduct[]) => void;
}

const BagsContext = createContext<BagContextValue>({
  bags: [],
  setBags: () => {},
});

BagsContext.displayName = "Bags Context";

export default BagsContext;
