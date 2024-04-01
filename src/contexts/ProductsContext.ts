import { createContext } from "react";

import { Product } from "../hooks/useProducts";

interface ProductsContextValue {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const ProductsContext = createContext<ProductsContextValue>({
  products: [],
  setProducts: () => {},
});

ProductsContext.displayName = "Products Context";

export default ProductsContext;
