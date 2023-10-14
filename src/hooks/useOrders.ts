import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";

import { DataError, Response } from "../services/client";
import { NewOrder, Order } from "./useOrder";
import { Product } from "../components/shops/product/Card";
import auth from "../services/auth";
import OrdersContext from "../contexts/OrdersContext";
import service, { endpoint } from "../services/orders";
import useData from "./useData";

const useOrders = () => {
  const { orders, setOrders } = useContext(OrdersContext);
  const user = auth.getCurrentUser();
  const { data, error, isLoading } = useData<Order>(`${endpoint}/${user?._id}`);
  const navigate = useNavigate();
  const shopId = useParams().shopId;

  useEffect(() => {
    if (!error) setOrders(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const prepOrder = (products: Product[], message: string): NewOrder => ({
    message,
    products: products.map((p) => p._id),
    shop: shopId || "",
  });

  const processResponse = (res: ApiResponse<unknown, unknown>): Response => {
    const { data, ok, problem } = res;

    ok
      ? toast.success("Order placed successfully!")
      : toast.error((data as DataError)?.error || problem);

    return { data, ok, problem };
  };

  const isStateValid = (products: Product[]): boolean => {
    if (products.length && shopId) return true;

    const message = !products.length
      ? "Error! Your products are not reflected in your shopping bag"
      : "App error!";
    toast.error(message);

    navigate(-1);
    return false;
  };

  const makeOrder = async (
    products: Product[],
    message = ""
  ): Promise<Response> => {
    if (!isStateValid(products))
      return { data: null, ok: false, problem: "CLIENT_ERROR" };

    const response = await service.makeOrder(prepOrder(products, message));

    return processResponse(response);
  };

  return { isLoading, orders, makeOrder };
};

export default useOrders;
