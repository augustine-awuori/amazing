import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { endpoint, NewProduct } from "../services/products";
import { FormData } from "../components/forms/NewProductForm";
import { Product } from "../components/shops/product/Card";
import ProductsContext from "../contexts/ProductsContext";
import service from "../services/products";
import useData from "./useData";

const useProducts = (shopId: string | undefined) => {
  const { data, error, isLoading } = useData<Product>(`${endpoint}/${shopId}`);
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    if (products.length === data?.length) return;

    if (!error && shopId) setProducts(data);
  }, [shopId, products.length, data, setProducts, error]);

  const create = async (product: NewProduct) => {
    const { data: newProduct, ok, problem } = await service.create(product);

    let error = "";
    if (ok) {
      setProducts([newProduct as Product, ...products]);
      toast("Product has been saved successfully");
    } else {
      error = (newProduct as DataError)?.error || problem;
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
      error = (data as DataError)?.error || problem;
      toast.error("Product update failed!");
    }

    return { error, ok };
  };

  const deleteProductBy = async (productId: string) => {
    const old = [...products];
    setProducts(old.filter((p) => p._id !== productId));

    const { data, ok, problem } = await service.deleteProductBy(productId);
    let error = "";
    if (!ok) {
      setProducts(old);
      toast.error("Product deletion terminated unsuccessfully!");
      error = (data as DataError)?.error || problem;
    } else toast("Product deleted succesfully!");

    return { ok, error };
  };

  return {
    create,
    deleteProductBy,
    isLoading,
    products: error || isLoading ? [] : data,
    productsCount: data?.length || 0,
    setProducts,
    update,
  };
};

export default useProducts;
