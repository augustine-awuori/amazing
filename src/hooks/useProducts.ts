import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { endpoint, NewProduct } from "../services/products";
import { Product } from "../components/shops/product/Card";
import { ProductFormData } from "../data/schemas";
import ProductsContext from "../contexts/ProductsContext";
import service from "../services/products";
import useData from "./useData";

const useProducts = (shopId: string | undefined) => {
  const { data, error, isLoading } = useData<Product>(getApiEndpoint());
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    if (products.length === data?.length) return;

    if (!error && shopId) setProducts(mapQuantity(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId, products.length]);

  function mapQuantity(products: Product[]): Product[] {
    return products.map((p) => ({ ...p, quantity: 0 }));
  }

  function getApiEndpoint() {
    return shopId ? `${endpoint}/${shopId}` : endpoint;
  }

  const create = async (product: NewProduct) => {
    const { data: newProduct, ok, problem } = await service.create(product);

    let error = "";
    if (ok) {
      setProducts([newProduct as Product, ...products]);
      toast("Product has been saved successfully");
    } else {
      error = (newProduct as DataError)?.error || problem;
      toast.error("Product not saved!");
    }

    return { error, ok };
  };

  const update = async (info: ProductFormData, productId: string) => {
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
    const initial = [...products];
    setProducts(initial.filter((p) => p._id !== productId));

    const { data, ok, problem } = await service.deleteProductBy(productId);
    let error = "";
    if (!ok) {
      setProducts(initial);
      toast.error("Product deletion terminated unsuccessfully!");
      error = (data as DataError)?.error || problem;
    } else toast("Product deleted succesfully!");

    return { ok, error };
  };

  const getProducts = () => {
    if (error || (data as DataError)?.error || isLoading) return [];

    return mapQuantity(data);
  };

  const addProduct = (product: Product) => setProducts([product, ...products]);

  const result = getProducts();

  return {
    addProduct,
    create,
    deleteProductBy,
    isLoading,
    products: result,
    productsCount: result.length,
    setProducts,
    update,
  };
};

export default useProducts;
