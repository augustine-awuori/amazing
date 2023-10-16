import { BagProduct } from "components/shops/BagTable";
import { Product } from "components/shops/product/Card";

export default (bagProduct: BagProduct): Product => ({
  ...bagProduct,
});
