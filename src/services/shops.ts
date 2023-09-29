import client from "./client";

import { NewShop } from "../hooks/useShop";

export const endpoint = "/shops";

const create = ({ image, name, type }: NewShop) => {
  const data = new FormData();
  data.append("image", image);
  data.append("name", name);
  data.append("type", type);

  return client.post("/shops", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getShop = (shopId: string) => client.get(`${endpoint}/${shopId}`);

export default { create, getShop };
