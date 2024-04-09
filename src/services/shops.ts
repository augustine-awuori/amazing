import client from "./client";
import { NewShop } from "../hooks/useShop";

export const endpoint = "/shops";

const create = (shop: NewShop) => client.post("/shops", shop);

const deleteShop = (shopId: string) => client.delete(`${endpoint}/${shopId}`);

const getShop = (shopId: string) => client.get(`${endpoint}/${shopId}`);

const update = (shop: object, shopId: string) =>
  client.patch(`${endpoint}/${shopId}`, shop);

const incViews = (shopId: string) =>
  client.patch(`${endpoint}/views/${shopId}`);

export default { create, deleteShop, incViews, getShop, update };
