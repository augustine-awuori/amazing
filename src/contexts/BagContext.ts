import React from "react";

import { Product } from "../components/shops/ProductCard";

export type ProductsIds = { [productId: string]: boolean };

export type Bag = { products: Product[]; ids: ProductsIds };

interface BagContextValue {
  bag: Bag;
  setBag: (bag: Bag) => void;
}

const BagContext = React.createContext<BagContextValue>({
  bag: { products: [], ids: {} },
  setBag: () => {},
});

BagContext.displayName = "Bag Context";

export default BagContext;
