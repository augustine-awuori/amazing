import { useContext } from "react";
import { User } from "./useUser";
import ShopContext from "../contexts/ShopContext";

export interface Type {
  _id: string;
  label: string;
}

export interface Shop {
  _id: string;
  author: User;
  image: string;
  name: string;
  type: Type;
}

const useShop = () => useContext(ShopContext);

export default useShop;
