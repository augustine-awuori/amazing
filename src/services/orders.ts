import { NewOrder } from "../hooks/useOrder";
import client from "./client";

const endpoint = "/orders";

const makeOrder = (order: NewOrder) => client.post(endpoint, order);

const getMyOrders = (userId: string) => client.get(`/my/${userId}`);

const getShopOrders = (shopId: string) => client.get(`/shop/${shopId}`);

export default { getMyOrders, getShopOrders, makeOrder };
