import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import { Order } from "../hooks/useOrder";
import { Product } from "../components/shops/product/Card";
import { Request } from "../hooks/useRequest";
import { Shop, ShopProduct } from "../hooks/useShop";
import { Type } from "../hooks/useTypes";
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
  views: 0,
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

const type: Type = {
  _id: "",
  label: "All Types",
  icon: undefined,
  rightIcon: undefined,
  route: "",
};

const category: Category = {
  _id: "",
  label: "All Categories",
  icon: undefined,
  rightIcon: undefined,
  route: "",
};

export default {
  category,
  listing: { ...listing, paramsId: "listingId" },
  order: { ...order, paramsId: "orderId" },
  product: { ...product, paramsId: "productId" },
  request: { ...request, paramsId: "requestId" },
  shop: { ...shop, paramsId: "shopId" },
  type,
  user: { ...author, paramsId: "userId" },
};
