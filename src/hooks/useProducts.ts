import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DataError, getCacheData } from "../services/client";
import { endpoint, NewProduct } from "../services/products";
import { ProductFormData } from "../data/schemas";
import { ShopProduct } from "./useShop";
import { ProductType } from "./useProductTypes";
import { User } from "./useUser";
import ProductsContext from "../contexts/ProductsContext";
import service from "../services/products";
import storage from "../db/image";
import useData from "./useData";

export interface Product {
  _id: string;
  author: User;
  description: string;
  images: string[];
  name: string;
  price: number;
  shop: ShopProduct;
  timestamp: number;
  type: ProductType;
}

const useProducts = (shopId?: string) => {
  const { data, error, ...rest } = useData<Product>(getApiEndpoint());
  const { products, setProducts } = useContext(ProductsContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId, products.length, data?.length]);

  const loadProducts = async () => {
    const cached = await cachedProducts();
    if (cached.length && rest.isLoading) return setProducts(cached);

    setLoading(true);
    setProducts(retrievedProducts());
    setLoading(false);
  };

  function retrievedProducts() {
    return !error && shopId ? data : [];
  }

  async function cachedProducts() {
    setLoading(true);
    const data = await getCacheData<Product>(getApiEndpoint());
    setLoading(false);

    return data;
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
      toast.error(error || "Product not saved!");
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

  const deleteProductById = async (productId: string) => {
    const initial = [...products];
    let found: Product | undefined;

    toast.loading("Deleting product...");
    setProducts(
      initial.filter((p) => {
        if (p._id === productId) found = p;

        return p._id !== productId;
      })
    );

    const { data, ok, problem } = await service.deleteProductBy(productId);
    toast.dismiss();
    let error = "";
    if (!ok) {
      setProducts(initial);
      toast.error(
        (data as DataError).error ||
          "Product deletion terminated unsuccessfully!"
      );
      error = (data as DataError)?.error || problem;
    } else {
      found?.images?.forEach(async (image) => await storage.deleteImage(image));
      toast("Product deleted succesfully!");
    }

    return { ok, error };
  };

  const getProducts = () => {
    if (error || (data as DataError)?.error || rest.isLoading) return [];

    return data;
  };

  const addProduct = (product: Product) => setProducts([product, ...products]);

  const updateProductImage = async (productId: string, image: string) =>
    await service.updateImage(productId, image);

  const result = getProducts();

  const getProduct = async (productId: string) =>
    await service.getProduct(productId);

  return {
    addProduct,
    create,
    deleteProductById,
    isLoading,
    getProduct,
    products: result,
    productsCount: result.length,
    setProducts,
    update,
    updateProductImage,
  };
};

export default useProducts;
