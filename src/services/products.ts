import client from "./client";

export interface NewProduct {
  author: string;
  description: string;
  name: string;
  price: string;
  image: File;
  shop: string;
}

export const endpoint = "/products";

const getProductURL = (productId: string) => `${endpoint}/${productId}`;

const create = ({
  author,
  description,
  image,
  name,
  price,
  shop,
}: NewProduct) => {
  const data = new FormData();
  data.append("author", author);
  data.append("description", description);
  data.append("image", image);
  data.append("name", name);
  data.append("price", price);
  data.append("shop", shop);

  return client.post(endpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const update = (info: { name: string; price: string }, productId: string) =>
  client.patch(getProductURL(productId), info);

const deleteProductBy = (productId: string) =>
  client.delete(getProductURL(productId));

export default { create, deleteProductBy, update };
