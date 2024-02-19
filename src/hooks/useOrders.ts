import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";

import { DataError, Response, appBaseUrl } from "../services/client";
import { NewOrder, Order } from "./useOrder";
import { Product } from "../components/shops/product/Card";
import OrdersContext from "../contexts/OrdersContext";
import service from "../services/orders";
import useData from "./useData";
import util from "../utils/funcs";
import useCart from "./useCart";

type ShopsProducts = { [shopId: string]: Product[] };

const useOrders = (targetUrl?: string) => {
  const { data, error, isLoading } = useData<Order>(`orders/${targetUrl}`);
  const { setOrders } = useContext(OrdersContext);
  const [success, setSuccess] = useState(true);
  const navigate = useNavigate();
  const cart = useCart();

  useEffect(() => {
    if (!error) setOrders(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUrl, data?.length]);

  const prepOrder = (products: Product[], message: string): NewOrder => ({
    message,
    products: products.map((p) => p._id),
    shop: products[0].shop._id,
  });

  const processResponse = (res: ApiResponse<unknown, unknown>): Response => {
    const { data, ok, problem } = res;

    ok
      ? toast.success("Order placed successfully!")
      : toast.error((data as DataError)?.error || problem);

    return { data, ok, problem };
  };

  const isStateValid = (products: Product[]): boolean => {
    if (products.length) return true;

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

  const sendWhatsAppNotification = (orderId: string, message: string) =>
    util.navTo(`${appBaseUrl}notifications/orders/${orderId}`, message);

  const makeShopOrder = async (prods: Product[], message: string) => {
    const { data, ok } = await makeOrder(prods, message);
    ok
      ? sendWhatsAppNotification((data as Order)._id, message)
      : setSuccess(ok);
  };

  const getShopsProducts = (): ShopsProducts => {
    const shopsProducts: ShopsProducts = {};

    cart.getProducts().forEach((p) => {
      const shopId = p.shop._id;

      if (shopsProducts[shopId])
        shopsProducts[shopId] = [...shopsProducts[shopId], p];
      else shopsProducts[shopId] = [p];
    });

    return shopsProducts;
  };

  const makeShopsOrders = async (message: string) => {
    for (const [, products] of Object.entries(getShopsProducts()))
      makeShopOrder(products, message);

    if (success) {
      cart.clear();
      toast.success("Order placed successfully!");
    } else toast.error("Something went wrong! Some orders aren't placed");
  };

  return { isLoading, orders: data, makeOrder, makeShopsOrders };
};

export default useOrders;
