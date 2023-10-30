import client from "./client";
import { NewShop } from "../hooks/useShop";
import { ShopFormData } from "../data/schemas";

export const endpoint = "/shops";

const create = ({ image, name, type, location }: NewShop) => {
  const data = new FormData();
  data.append("image", image);
  data.append("name", name);
  data.append("type", type);
  data.append("location", location);

  return client.post("/shops", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deleteShop = (shopId: string) => client.delete(`${endpoint}/${shopId}`);

const getShop = (shopId: string) => client.get(`${endpoint}/${shopId}`);

const update = (shop: ShopFormData, shopId: string) =>
  client.patch(`${endpoint}/${shopId}`, shop);

export default { create, deleteShop, getShop, update };
