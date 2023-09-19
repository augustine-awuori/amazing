import { useContext } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { NewShop, Shop, Type } from "./useShop";
import { User } from "./useUser";
import service from "../services/shops";
import ShopsContext from "../contexts/ShopsContext";

import pic from "../assets/pic.png";

const author: User = {
  _id: "th",
  avatar: "",
  isAdmin: false,
  isVerified: true,
  name: "Baby",
  otherAccounts: { whatsapp: "254712345678" },
  timestamp: 34223,
  username: "@softbaby",
};

const fakeShops: Shop[] = [
  {
    _id: "1",
    author,
    image: pic,
    name: "Tasty Bakery",
    type: { _id: "a", label: "Bakery" },
  },
  {
    _id: "3",
    author,
    image: pic,
    name: "Book Store",
    type: { _id: "b", label: "Beauty" },
  },
  {
    _id: "4",
    author,
    image: pic,
    name: "Fresh Meat Point",
    type: { _id: "c", label: "Butchery" },
  },
  {
    _id: "5",
    author,
    image: pic,
    name: "Best Lady",
    type: { _id: "b", label: "Beauty" },
  },
  {
    _id: "6",
    author,
    image: pic,
    name: "Gas Cylinders Refill Point ",
    type: { _id: "d", label: "Cookery" },
  },
  {
    _id: "7",
    author: { ...author, name: "Jesus" },
    image: pic,
    name: "Cycle Repair Shop",
    type: { _id: "e", label: "Mechanic" },
  },
  {
    _id: "8",
    author: { ...author, name: "Samuel L Jackson" },
    image: pic,
    name: "Westside Salon",
    type: { _id: "b", label: "Beauty" },
  },
];

const types: Type[] = [
  { _id: "", label: "All Types" },
  { _id: "a", label: "Bakery" },
  { _id: "b", label: "Beauty" },
  { _id: "c", label: "Butchery" },
  { _id: "d", label: "Cookery" },
  { _id: "e", label: "Mechanic" },
];

const useShops = () => {
  // const { data, error, isLoading } = useData<Shop>(endpoint);
  const { setShops, shops } = useContext(ShopsContext);

  const hasShop = (shops: Shop[]) => shops.length;

  const getShops = () => {
    if (hasShop(shops)) return shops;
    // if (hasShop(data)) return data;
    return fakeShops;
  };

  const create = async (info: NewShop) => {
    const { data, ok, problem } = await service.create(info);
    const error = (data as DataError)?.error || problem || "";

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
    isLoading: false,
    setShops,
    types,
  };
};

export default useShops;
