import { NewOrder } from "../hooks/useOrder";
import client from "./client";

export const endpoint = "/orders";

const makeOrder = (order: NewOrder) => client.post(endpoint, order);

const getMyOrders = (userId: string) => client.get(`/my/${userId}`);

const getOrder = (orderId: string) => client.get(orderId);

const getShopOrders = (shopId: string) => client.get(`/shop/${shopId}`);

const updateOrder = (orderId: string, update: object) =>
  client.patch(`${endpoint}/${orderId}`, update);

export default { getMyOrders, getOrder, getShopOrders, makeOrder, updateOrder };
