import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import { Order } from "../hooks/useOrder";
import { Product } from "../hooks/useProducts";
import { Request } from "../hooks/useRequest";
import { Shop, ShopProduct } from "../hooks/useShop";
import { Status } from "../hooks/useStatus";
import { ProductType } from "../hooks/useProductTypes";
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
  types: {},
  views: 0,
};

const shopProduct: ShopProduct = {
  ...shop,
  author: "",
  types: {},
};

const product: Product = {
  _id: "",
  author,
  description: "",
  images: [],
  name: "",
  price: 100,
  shop: shopProduct,
  timestamp: 0,
  type: { _id: "", label: "" },
};

const status: Status = { _id: "", color: "orange", label: "All" };

const order: Order = {
  _id: "",
  buyer: { ...author },
  canceled: false,
  message: "",
  products: {},
  seen: false,
  shop,
  status,
  timestamp: 52086,
};

const type: ProductType = {
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
  status: { ...status },
  type,
  user: { ...author, paramsId: "userId" },
};
