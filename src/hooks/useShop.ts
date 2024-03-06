import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { DataError } from "../services/client";
import { Type } from "./useTypes";
import { User } from "./useUser";
import service from "../services/shops";
import ShopContext from "../contexts/ShopContext";

interface Common {
  location: string;
  name: string;
}

interface ShopBase {
  _id: string;
  image: string;
  isVerified: boolean;
}

export interface Shop extends Common, ShopBase {
  author: User;
  type: Type;
  views: number;
}

export interface ShopProduct extends Common, ShopBase {
  author: string;
  type: string;
}

export interface NewShop extends Common {
  image: string;
  type: string;
  name: string;
}

const useShop = () => {
  const { setShop, shop } = useContext(ShopContext);
  const shopId = useParams().shopId;

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  async function init() {
    if (!shopId) return;

    const shop = await getShop(shopId);

    if (shop) setShop(shop);
  }

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
