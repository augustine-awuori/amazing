import React from "react";

import { Product } from "../components/shops/product/Card";

interface ProductsContextValue {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const ProductsContext = React.createContext<ProductsContextValue>({
  products: [],
  setProducts: () => {},
});

ProductsContext.displayName = "Products Context";

export default ProductsContext;
