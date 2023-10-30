import { Order } from "hooks/useOrder";
import { Listing } from "../hooks/useListing";
import { Product } from "../components/shops/product/Card";
import { Request } from "../hooks/useRequest";
import { Shop, ShopProduct } from "../hooks/useShop";
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

const shopProduct: ShopProduct = {
  ...shop,
  author: "",
  type: "",
};

const product: Product = {
  _id: "",
  description: "",
  image: "",
  name: "",
  price: 100,
  quantity: 0,
  shop: shopProduct,
  timestamp: 0,
};

const order: Order = {
  buyer: { ...author, canceled: false, hasShop: false, seen: false },
  _id: "",
  products: [],
  shop,
  timestamp: 52086,
  message: "",
};

export default {
  listing: { ...listing, paramsId: "listingId" },
  order: { ...order, paramsId: "orderId" },
  product: { ...product, paramsId: "" },
  request: { ...request, paramsId: "requestId" },
  shop: { ...shop, paramsId: "shopId" },
  user: { ...author, paramsId: "userId" },
};
