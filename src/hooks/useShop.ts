import { useContext } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Type } from "./useTypes";
import { User } from "./useUser";
import service from "../services/shops";
import ShopContext from "../contexts/ShopContext";

interface Common {
  name: string;
}

export interface Shop extends Common {
  _id: string;
  author: User;
  image: string;
  isVerified: boolean;
  location: string;
  type: Type;
}

export interface NewShop extends Common {
  image: File;
  type: string;
  name: string;
}

const useShop = () => {
  const { setShop, shop } = useContext(ShopContext);

  const getShop = async (shopId: string) => {
    const { data, ok, problem } = await service.getShop(shopId);

    if (ok) return data as Shop;

    toast.error(`${problem}: ${(data as DataError)?.error}`);
  };

  const resetShop = async (shopId: string) => {
    const shop = await getShop(shopId);
    if (shop) setShop(shop);
  };

  return { resetShop, setShop, shop };
};

export default useShop;
