import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { endpoint, NewProduct } from "../services/products";
import { FormData } from "../components/forms/NewProductForm";
import { Product } from "../components/shops/product/Card";
import ProductsContext from "../contexts/ProductsContext";
import service from "../services/products";
import useData from "./useData";

const output = {
  create: () => ({ error: "App Error", ok: false }),
  isLoading: false,
  products: [],
  productsCount: 0,
  setProducts: () => {},
  update: () => ({ error: "", ok: false }),
};

const useProducts = (shopId: string | undefined) => {
  if (!shopId) return output;
  const { data, error, isLoading } = useData<Product>(`${endpoint}/${shopId}`);
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    if (!error) setProducts(data);
  }, [shopId, products.length]);

  const create = async (product: NewProduct) => {
    const { data: newProduct, ok, problem } = await service.create(product);

    let error = "";
    if (ok) {
      setProducts([newProduct as Product, ...products]);
      toast("Product has been saved successfully");
    } else {
      error = (newProduct as any)?.error || problem;
      toast("Product not saved!");
    }

    return { error, ok };
  };

  const update = async (info: FormData, productId: string) => {
    const { data, ok, problem } = await service.update(info, productId);

    let error = "";
    if (ok) {
      setProducts(
        [...products].map((p) => (p._id === productId ? (data as Product) : p))
      );
      toast("Product updated successfully");
    } else {
      error = (data as any)?.error || problem;
      toast.error("Product update failed!");
    }

    return { error, ok };
  };

  return {
    create,
    isLoading,
    products: error || isLoading ? [] : data,
    productsCount: data?.length || 0,
    setProducts,
    update,
  };
};

export default useProducts;
