const listing = {
  _id: "",
  author: { _id: "", name: "", username: "" },
  category: { _id: "", label: "" },
  description: "",
  images: [],
  paramsId: "listingId",
  price: undefined,
  timestamp: 0,
  title: "",
};

const request = {
  _id: "",
  author: { _id: "", name: "", username: "" },
  category: { _id: "", label: "" },
  description: "",
  paramsId: "requestId",
  timestamp: 0,
  title: "",
};

const user = {
  _id: "",
  aboutMe: "",
  name: "",
  otherAccounts: {},
  paramsId: "userId",
  timestamp: 0,
  username: "",
  isAdmin: false,
  isVerified: false,
};

export default { listing, request, user };
