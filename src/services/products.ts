import client from "./client";

export interface NewProduct {
  author: string;
  description: string;
  name: string;
  price: string;
  images: string[];
  shop: string;
}

export const endpoint = "/products";

const getProductURL = (productId: string) => `${endpoint}/${productId}`;

const create = (product: NewProduct) => client.post(endpoint, product);

const update = (info: object, productId: string) =>
  client.patch(getProductURL(productId), info);

const deleteProductBy = (productId: string) =>
  client.delete(getProductURL(productId));

const updateImage = (productId: string, image: string) =>
  client.patch(`${endpoint}/image/${productId}`, { image });

const getProduct = (productId: string) =>
  client.get(`${endpoint}/single/${productId}`);

export default { create, deleteProductBy, getProduct, update, updateImage };
