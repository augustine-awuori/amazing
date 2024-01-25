import client from "./client";

export interface NewProduct {
  author: string;
  description: string;
  name: string;
  price: string;
  image: string;
  shop: string;
}

export const endpoint = "/products";

const getProductURL = (productId: string) => `${endpoint}/${productId}`;

const create = (product: NewProduct) => client.post(endpoint, product);

const update = (info: { name: string; price: string }, productId: string) =>
  client.patch(getProductURL(productId), info);

const deleteProductBy = (productId: string) =>
  client.delete(getProductURL(productId));

export default { create, deleteProductBy, update };
