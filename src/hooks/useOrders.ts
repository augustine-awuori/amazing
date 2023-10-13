import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { NewOrder, Order } from "./useOrder";
import { Product } from "../components/shops/product/Card";
import auth from "../services/auth";
import OrdersContext from "../contexts/OrdersContext";
import service from "../services/orders";

const useOrders = () => {
  const { orders, setOrders } = useContext(OrdersContext);
  const shopId = useParams().shopId;

  useEffect(() => {
    initOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initOrders = async () => {
    const user = auth.getCurrentUser();
    if (user) {
      const { data, ok } = await getMyOrders(user._id);
      if (ok) setOrders(data as Order[]);
    }
  };

  const prepOrder = (products: Product[], message: string): NewOrder => ({
    message,
    products: products.map((p) => p._id),
    shop: shopId || "",
  });

  const processResponse = (res: ApiResponse<unknown, unknown>): boolean => {
    const { data, ok, problem } = res;

    ok
      ? toast.success("Order placed successfully!")
      : toast.error((data as DataError)?.error || problem);

    return ok;
  };

  const makeOrder = async (
    products: Product[],
    message = ""
  ): Promise<boolean> => {
    if (!products.length || shopId) {
      toast.error("App error! Restart app");
      return false;
    }

    const response = await service.makeOrder(prepOrder(products, message));

    return processResponse(response);
  };

  async function getMyOrders(userId: string) {
    const { ok, data, problem } = await service.getMyOrders(userId);

    ok
      ? toast("Orders retrieved")
      : toast.error((data as DataError)?.error || problem);

    return { ok, data, problem };
  }

  return { orders, getMyOrders, makeOrder };
};

export default useOrders;
