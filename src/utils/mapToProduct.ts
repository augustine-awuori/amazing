import { BagProduct } from "components/shops/BagTable";
import { Product } from "components/shops/product/Card";

export default ({
  _id,
  description,
  image,
  name,
  price,
  quantity,
}: BagProduct): Product => ({ _id, description, name, image, price, quantity });
