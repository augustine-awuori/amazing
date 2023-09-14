import { useContext } from "react";

import { endpoint } from "../services/shops";
import { Shop, Type } from "./useShop";
import { User } from "./useUser";
import ShopsContext from "../contexts/ShopsContext";
import useData from "./useData";

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
    name: "Barber Shop",
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
  const { error, isLoading } = useData<Shop>(endpoint);
  const { setShops } = useContext(ShopsContext);

  return { shops: fakeShops, error, isLoading, setShops, types };
};

export default useShops;
