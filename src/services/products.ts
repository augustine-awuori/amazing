import client from "./client";

export interface NewProduct {
  author: string;
  image: File;
  name: string;
  price: string;
  shop: string;
}

export const endpoint = "/products";

const create = ({ author, image, name, price, shop }: NewProduct) => {
  const data = new FormData();
  data.append("image", image);
  data.append("name", name);
  data.append("author", author);
  data.append("price", price);
  data.append("shop", shop);

  return client.post(endpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const update = (info: { name: string; price: string }, productId: string) =>
  client.patch(`${endpoint}/${productId}`, info);

export default { create, update };
