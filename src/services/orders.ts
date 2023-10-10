import client from "./client";

const endpoint = "/orders";

export interface Order {
  seller: string;
  products: string[];
  message: string;
}

const makeOrder = (order: Order) => client.post(endpoint, order);

export default { makeOrder };
