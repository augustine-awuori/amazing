import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { NewShop, Shop } from "./useShop";
import { ShopFormData } from "../data/schemas";
import service, { endpoint } from "../services/shops";
import ShopsContext from "../contexts/ShopsContext";
import useData from "./useData";

const useShops = () => {
  const { data, error, isLoading } = useData<Shop>(endpoint);
  const { setShops, shops } = useContext(ShopsContext);

  useEffect(() => {
    if (!error) setShops(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getShops = () => (error ? [] : data);

  const create = async (info: NewShop) => {
    const { data, ok, problem } = await service.create(info);
    const error = (data as DataError)?.error || problem || "UNKNOWN_ERROR";

    if (!ok) toast.error(`Failed! ${error}`);
    else {
      setShops([data as Shop, ...shops]);
      toast.success("Shop created successfully!");
    }

    return { ok, error };
  };

  const deleteShop = async (shopId: string | undefined): Promise<boolean> => {
    if (!shopId) {
      toast.error(
        "App error! Shop couldn't be deleted at the moment. Try again later"
      );
      return false;
    }

    const { data, ok, problem } = await service.deleteShop(shopId);
    ok
      ? toast.success("Shop deleted successfully")
      : toast.error((data as DataError).error || problem);

    return ok;
  };

  const updateShop = (shop: Shop) =>
    setShops(shops.map((s) => (s._id === shop._id ? shop : s)));

  const update = async (shop: ShopFormData, shopId: string) => {
    const { data, ok, problem } = await service.update(shop, shopId);

    if (!ok) toast.error("Shop update failed!");
    else {
      toast.success("Shop updated successfully!");
      updateShop(data as Shop);
    }

    return { error: `${(data as DataError).error || problem}`, ok };
  };

  return {
    create,
    deleteShop,
    shops: getShops(),
    error: "",
    isLoading,
    setShops,
    update,
  };
};

export default useShops;
