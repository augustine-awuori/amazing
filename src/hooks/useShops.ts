import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { NewShop, Shop } from "./useShop";
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

  return {
    create,
    shops: getShops(),
    error: "",
    isLoading,
    setShops,
  };
};

export default useShops;
