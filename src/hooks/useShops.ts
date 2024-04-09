import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DataError, getCacheData } from "../services/client";
import { NewShop, Shop } from "./useShop";
import { UpdateShop } from "../components/shops/UpdateForm";
import cache from "../utils/cache";
import service, { endpoint } from "../services/shops";
import ShopsContext from "../contexts/ShopsContext";
import useData from "./useData";
import storage from "../db/image";

const useShops = () => {
  const { data, error, ...rest } = useData<Shop>(endpoint);
  const { setShops, shops } = useContext(ShopsContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    rest.isLoading ? preLoadShops() : initShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length]);

  function initShops() {
    setLoading(true);
    setShops(error ? [] : data);
    setLoading(false);
  }

  async function preLoadShops() {
    setLoading(true);
    if (rest.isLoading) setShops(await getCacheData<Shop>(endpoint));
    setLoading(false);
  }

  const getShops = () => (error ? [] : data);

  const create = async (info: NewShop) => {
    const res = await service.create(info);
    const error = (data as DataError)?.error || res.problem || "UNKNOWN_ERROR";

    if (!res.ok) toast.error(`Failed! ${error}`);
    else {
      setShops([res.data as Shop, ...shops]);
      toast.success("Shop created successfully!");
    }

    return { ...res, error };
  };

  const deleteShop = async (shopId: string | undefined): Promise<boolean> => {
    if (!shopId) {
      toast.error(
        "App error! Shop couldn't be deleted at the moment. Try again later"
      );
      return false;
    }

    const { data, ok, problem } = await service.deleteShop(shopId);

    if (ok) {
      toast.success("Shop deleted successfully");
      shops.forEach(async (shop) => {
        if (shop._id === shopId) await storage.deleteImage(shop.image);
      });
    } else toast.error((data as DataError).error || problem);

    return ok;
  };

  const updateShop = (shop: Shop) =>
    setShops(shops.map((s) => (s._id === shop._id ? shop : s)));

  const update = async (shop: UpdateShop, shopId: string) => {
    const { data, ok, problem } = await service.update(shop, shopId);

    if (!ok) toast.error("Shop update failed!");
    else {
      toast.success("Shop updated successfully!");
      updateShop(data as Shop);
    }

    return { error: `${(data as DataError).error || problem}`, ok };
  };

  const decShopViews = (shopId: string, initial: Shop[]) => {
    setShops(initial);
    cache.removeViewFor(shopId);
  };

  const incShopViews = async (shopId: string) => {
    if (cache.hasViewedShop(shopId)) return;

    const previous = shops;
    setShops(
      shops.map((s) => (s._id === shopId ? { ...s, views: s.views + 1 } : s))
    );

    const res = await service.incViews(shopId);
    if (!res.ok) decShopViews(shopId, previous);
  };

  return {
    create,
    deleteShop,
    shops: getShops(),
    error: "",
    isLoading,
    setShops,
    update,
    incShopViews,
  };
};

export default useShops;
