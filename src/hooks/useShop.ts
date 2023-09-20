import { useContext } from "react";

import { Type } from "./useTypes";
import { User } from "./useUser";
import ShopContext from "../contexts/ShopContext";

interface Common {
  name: string;
}

export interface Shop extends Common {
  _id: string;
  author: User;
  image: string;
  type: Type;
}

export interface NewShop extends Common {
  image: File;
  type: string;
  name: string;
}

const useShop = () => useContext(ShopContext);

export default useShop;
