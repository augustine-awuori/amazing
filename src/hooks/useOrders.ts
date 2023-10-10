import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Product } from "../components/shops/product/Card";
import service, { Order } from "../services/orders";
import useShop from "./useShop";

const useOrders = () => {
  const { shop } = useShop();

  const prepOrder = (products: Product[], message: string): Order => ({
    message,
    products: products.map((p) => p._id),
    seller: shop?.author._id || "",
  });

  const makeOrder = async (products: Product[], message = "") => {
    if (!shop || !products.length) return toast.error("App error! Restart app");
    const { data, ok, problem } = await service.makeOrder(
      prepOrder(products, message)
    );

    if (ok) return toast.success("Order placed successfully!");

    toast.error((data as DataError).error || problem);
  };

  return { makeOrder };
};

export default useOrders;
