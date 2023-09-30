import { useContext } from "react";

import BagsContext, { ShopProduct } from "../contexts/BagsContext";
import { Product } from "../components/shops/product/Card";

const useBag = () => {
  const { bags: bag, setBags: setBag } = useContext(BagsContext);

  const findShop = (shopId: string) =>
    bag.find((shop) => Object.prototype.hasOwnProperty.call(shop, shopId));

  const getShopProducts = (shop: ShopProduct, shopId: string) => shop[shopId];

  const updateBagWith = (product: Product, shopId: string | undefined) => {
    if (!shopId) return;
    const shop = findShop(shopId);
    if (!shop) return setBag([...bag, { shopId: [product] }]);

    let shopProducts = getShopProducts(shop, shopId);
    let found = false;

    shopProducts = shopProducts.map((p) => {
      if (p._id === product._id) {
        found = true;
        return product;
      }
      return p;
    });

    if (!found) shopProducts.unshift(product);

    setBag([...bag, { shopId: shopProducts }]);
  };

  const findAndGetShopProducts = (shopId: string | undefined) => {
    if (!shopId) return;

    const shop = findShop(shopId);
    if (shop) return getShopProducts(shop, shopId);
  };

  return { bag, findAndGetShopProducts, updateBagWith, setBag };
};

export default useBag;
