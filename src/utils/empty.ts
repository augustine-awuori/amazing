import { Order } from "hooks/useOrder";
import { Listing } from "../hooks/useListing";
import { Request } from "../hooks/useRequest";
import { Shop } from "../hooks/useShop";
import { User } from "../hooks/useUser";

const author: User = {
  _id: "",
  aboutMe: "",
  avatar: "",
  isAdmin: false,
  isVerified: false,
  name: "",
  otherAccounts: { whatsapp: "+254745889801" },
  timestamp: 452045,
  username: "",
};

const listing: Listing = {
  _id: "",
  author,
  category: { _id: "", label: "" },
  description: "",
  images: ["", ""],
  price: 102,
  timestamp: 0,
  title: "",
};

const request: Request = {
  _id: "",
  author,
  category: { _id: "", label: "" },
  description: "",
  timestamp: 0,
  title: "",
};

const shop: Shop = {
  _id: "",
  author,
  image: "",
  isVerified: false,
  name: "",
  location: "",
  type: { _id: "", label: "" },
};

const order: Order = {
  _id: "",
  products: [],
  shop,
  timestamp: 52086,
  message: "",
};

export default {
  listing: { ...listing, paramsId: "listingId" },
  order: { ...order, paramsId: "orderId" },
  request: { ...request, paramsId: "requestId" },
  shop: { ...shop, paramsId: "shopId" },
  user: { ...author, paramsId: "userId" },
};
