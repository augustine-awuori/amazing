import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";

import { DataError, Response } from "../services/client";
import { NewOrder, OrderProducts, Order } from "./useOrder";
import { Product } from "../hooks/useProducts";
import { useCart, useData, useStatus } from ".";
import auth from "../services/auth";
import notificationsService from "../services/notifications";
import OrdersContext from "../contexts/OrdersContext";
import service from "../services/orders";

type ShopsProducts = { [shopId: string]: Product[] };

const PENDING_ORDER_STATUS_ID = "65f7f5babfb2e60edd3733a1";

const useOrders = (targetUrl?: string) => {
  const [success, setSuccess] = useState(true);
  const { data, error, isLoading } = useData<Order>(`/orders/${targetUrl}`);
  const { setOrders } = useContext(OrdersContext);
  const { status } = useStatus();
  const cart = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) setOrders(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUrl, error]);

  const getPendingOrderStatusId = () =>
    status.find((s) => s.label.toLowerCase().includes("pending"))?._id ||
    PENDING_ORDER_STATUS_ID;

  const prepOrderProducts = (products: Product[]): OrderProducts => {
    const result: OrderProducts = {};

    products.forEach(({ _id }) => {
      result[_id] = cart.getProductQuantity(_id);
    });

    return result;
  };

  const prepOrder = (products: Product[], message: string): NewOrder => ({
    message,
    products: prepOrderProducts(products),
    shop: products[0].shop._id,
    status: getPendingOrderStatusId(),
  });

  const process = (res: ApiResponse<unknown, unknown>): Response => {
    const { data, ok, problem } = res;

    if (ok) {
      toast.success("Order placed successfully!");
      notificationsService.create({
        title: "Amazing Mart",
        description: `${auth.getCurrentUser()?.name} has placed an order`,
        to: (data as Order).shop.author._id,
      });
    } else toast.error((data as DataError)?.error || problem);

    return { data, ok, problem };
  };

  const isOrderStateValid = (products: Product[]): boolean => {
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
    if (!isOrderStateValid(products))
      return { data: null, ok: false, problem: "CLIENT_ERROR" };

    return process(await service.makeOrder(prepOrder(products, message)));
  };

  const makeShopOrder = async (prods: Product[], message: string) => {
    const { ok } = await makeOrder(prods, message);

    if (!ok) setSuccess(ok);
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

  const updateOrder = async (orderId: string, update: object) => {
    toast.loading("Updating order status...");
    const res = await service.updateOrder(orderId, update);
    toast.dismiss();

    res.ok
      ? toast.success("Order status updated successfully!")
      : toast.error(
          (res.data as DataError).error || "Order status update failed"
        );

    return res;
  };

  return {
    ordersLoading: isLoading,
    orders: data,
    makeOrder,
    makeShopsOrders,
    updateOrder,
  };
};

export default useOrders;
