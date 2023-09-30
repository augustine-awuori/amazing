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

const listing = {
  _id: "",
  author,
  category: { _id: "", label: "" },
  description: "",
  images: ["", ""],
  paramsId: "listingId",
  price: 102,
  timestamp: 0,
  title: "",
};

const request = {
  _id: "",
  author,
  category: { _id: "", label: "" },
  description: "",
  paramsId: "requestId",
  timestamp: 0,
  title: "",
};

const shop = {
  _id: "",
  author,
  image: "",
  name: "",
  paramsId: "shopId",
  type: { _id: "", label: "" },
};

export default {
  listing,
  request,
  shop,
  user: { ...author, paramsId: "userId" },
};
